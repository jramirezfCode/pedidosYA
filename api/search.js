module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  if (req.method === 'OPTIONS') return res.status(200).end()
  const { q, country = 'pe', hl = 'es', currency } = req.query
  if (!q) return res.status(400).json({ error: 'Missing query param: q' })
  const SERP_KEY = process.env.SERPAPI_KEY
  if (!SERP_KEY) return res.status(500).json({ error: 'API key not configured' })

  const countryConfig = {
    pe: { gl: 'us', location: 'Peru' },
    mx: { gl: 'mx', location: 'Mexico' },
    ar: { gl: 'ar', location: 'Argentina' },
    cl: { gl: 'cl', location: 'Chile' },
    co: { gl: 'co', location: 'Colombia' },
    us: { gl: 'us', location: 'United States' },
    es: { gl: 'es', location: 'Spain' },
    br: { gl: 'br', location: 'Brazil' },
    uy: { gl: 'us', location: 'Uruguay' },
    ec: { gl: 'us', location: 'Ecuador' },
    bo: { gl: 'us', location: 'Bolivia' },
    py: { gl: 'us', location: 'Paraguay' },
    ve: { gl: 'us', location: 'Venezuela' },
  }

  const config = countryConfig[country.toLowerCase()] || { gl: 'us', location: 'United States' }

  try {
    const url = new URL('https://serpapi.com/search')
    url.searchParams.set('engine', 'google_shopping')
    url.searchParams.set('q', q)
    url.searchParams.set('gl', config.gl)
    url.searchParams.set('hl', hl)
    url.searchParams.set('location', config.location)
    url.searchParams.set('num', '20')
    url.searchParams.set('api_key', SERP_KEY)

    const resp = await fetch(url.toString())
    if (!resp.ok) {
      const errBody = await resp.text()
      throw new Error(`SerpApi error: ${resp.status} - ${errBody}`)
    }
    const data = await resp.json()

    const results = (data.shopping_results || []).map((item) => ({
      id:           item.product_id || String(Math.random()),
      title:        item.title,
      price:        item.price,
      extractedPrice: item.extracted_price,
      currency:     item.currency || currency || 'USD',
      source:       item.source,
      link:         item.link || item.product_link || null,
      thumbnail:    item.thumbnail,
      rating:       item.rating,
      reviews:      item.reviews,
      delivery:     item.delivery,
      badge:        item.badge,
      oldPrice:     item.old_price,
      extractedOldPrice: item.extracted_old_price,
    }))

    results.sort((a, b) => (a.extractedPrice || 999999) - (b.extractedPrice || 999999))

    return res.status(200).json({ results, searchQuery: q, country: config.gl })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: err.message })
  }
}
