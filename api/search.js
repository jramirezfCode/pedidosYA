const cheerio = require('cheerio')

async function scrapeRipley(q, scraperKey) {
  try {
    const url = `https://simple.ripley.com.pe/search?query=${encodeURIComponent(q)}`
    const resp = await fetch(`http://api.scraperapi.com?api_key=${scraperKey}&url=${encodeURIComponent(url)}&country_code=pe&render=true`)
    const html = await resp.text()
    const $ = cheerio.load(html)
    const results = []
    $('[class*="catalog-item"], [class*="ProductCard"], [class*="product-card"]').each((_, el) => {
      const title = $(el).find('[class*="title"], [class*="name"]').first().text().trim()
      const priceText = $(el).find('[class*="price"]').first().text().trim()
      const price = parseFloat(priceText.replace(/[^0-9.]/g, ''))
      const link = $(el).find('a').first().attr('href')
      const thumbnail = $(el).find('img').first().attr('src') || $(el).find('img').first().attr('data-src')
      if (title && price) {
        results.push({
          id: `ripley_${Math.random()}`,
          title,
          price: `S/ ${price.toLocaleString('es')}`,
          extractedPrice: price,
          currency: 'PEN',
          source: 'Ripley',
          link: link ? (link.startsWith('http') ? link : `https://simple.ripley.com.pe${link}`) : null,
          thumbnail,
          isLocal: true,
        })
      }
    })
    return results.slice(0, 8)
  } catch (e) {
    console.error('Ripley error:', e.message)
    return []
  }
}

async function scrapeFalabella(q, scraperKey) {
  try {
    const url = `https://www.falabella.com.pe/falabella-pe/search?Ntt=${encodeURIComponent(q)}`
    const resp = await fetch(`http://api.scraperapi.com?api_key=${scraperKey}&url=${encodeURIComponent(url)}&country_code=pe&render=true`)
    const html = await resp.text()
    const $ = cheerio.load(html)
    const results = []
    $('[class*="grid-pod"], [class*="product-item"], [class*="ProductItem"]').each((_, el) => {
      const title = $(el).find('[class*="display-name"], [class*="title"]').first().text().trim()
      const priceText = $(el).find('[class*="price"]').first().text().trim()
      const price = parseFloat(priceText.replace(/[^0-9.]/g, ''))
      const link = $(el).find('a').first().attr('href')
      const thumbnail = $(el).find('img').first().attr('src') || $(el).find('img').first().attr('data-src')
      if (title && price) {
        results.push({
          id: `saga_${Math.random()}`,
          title,
          price: `S/ ${price.toLocaleString('es')}`,
          extractedPrice: price,
          currency: 'PEN',
          source: 'Saga Falabella',
          link: link ? (link.startsWith('http') ? link : `https://www.falabella.com.pe${link}`) : null,
          thumbnail,
          isLocal: true,
        })
      }
    })
    return results.slice(0, 8)
  } catch (e) {
    console.error('Falabella error:', e.message)
    return []
  }
}

async function scrapeHiraoka(q, scraperKey) {
  try {
    const url = `https://www.hiraoka.com.pe/search?q=${encodeURIComponent(q)}`
    const resp = await fetch(`http://api.scraperapi.com?api_key=${scraperKey}&url=${encodeURIComponent(url)}&country_code=pe&render=true`)
    const html = await resp.text()
    const $ = cheerio.load(html)
    const results = []
    $('[class*="product-item"], [class*="ProductCard"], .product').each((_, el) => {
      const title = $(el).find('[class*="product-name"], [class*="title"], h2, h3').first().text().trim()
      const priceText = $(el).find('[class*="price"]').first().text().trim()
      const price = parseFloat(priceText.replace(/[^0-9.]/g, ''))
      const link = $(el).find('a').first().attr('href')
      const thumbnail = $(el).find('img').first().attr('src') || $(el).find('img').first().attr('data-src')
      if (title && price) {
        results.push({
          id: `hiraoka_${Math.random()}`,
          title,
          price: `S/ ${price.toLocaleString('es')}`,
          extractedPrice: price,
          currency: 'PEN',
          source: 'Hiraoka',
          link: link ? (link.startsWith('http') ? link : `https://www.hiraoka.com.pe${link}`) : null,
          thumbnail,
          isLocal: true,
        })
      }
    })
    return results.slice(0, 8)
  } catch (e) {
    console.error('Hiraoka error:', e.message)
    return []
  }
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  if (req.method === 'OPTIONS') return res.status(200).end()

  const { q, country = 'pe', currency } = req.query
  if (!q) return res.status(400).json({ error: 'Missing query param: q' })

  const SERP_KEY = process.env.SERPAPI_KEY
  const SCRAPER_KEY = process.env.SCRAPERAPI_KEY

  const mlSiteMap = {
    pe: 'MPE', mx: 'MLM', ar: 'MLA', cl: 'MLC', co: 'MCO',
    uy: 'MLU', ec: 'MEC', bo: 'MBO', py: 'MPY', ve: 'MLV',
    br: 'MLB', us: null, es: 'MLS',
  }

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

  const countryCode = country.toLowerCase()
  const mlSite = mlSiteMap[countryCode]
  const config = countryConfig[countryCode] || { gl: 'us', location: 'United States' }
  const results = []

  // 1. Tiendas peruanas (Ripley, Falabella, Hiraoka)
  if (countryCode === 'pe' && SCRAPER_KEY) {
    const [ripley, falabella, hiraoka] = await Promise.all([
      scrapeRipley(q, SCRAPER_KEY),
      scrapeFalabella(q, SCRAPER_KEY),
      scrapeHiraoka(q, SCRAPER_KEY),
    ])
    results.push(...ripley, ...falabella, ...hiraoka)
  }

  // 2. Mercado Libre (otros países)
  if (mlSite && countryCode !== 'pe') {
    try {
      const mlUrl = `https://api.mercadolibre.com/sites/${mlSite}/search?q=${encodeURIComponent(q)}&limit=15`
      const mlResp = await fetch(mlUrl)
      if (mlResp.ok) {
        const mlData = await mlResp.json()
        const mlResults = (mlData.results || []).map((item) => ({
          id: `ml_${item.id}`,
          title: item.title,
          price: `${currency || ''} ${item.price?.toLocaleString('es') || ''}`.trim(),
          extractedPrice: item.price,
          currency: item.currency_id || currency || 'USD',
          source: item.seller?.nickname || 'Mercado Libre',
          link: item.permalink,
          thumbnail: item.thumbnail?.replace('I.jpg', 'O.jpg'),
          rating: item.reviews?.rating_average || null,
          reviews: item.reviews?.total || null,
          delivery: item.shipping?.free_shipping ? 'Free shipping' : null,
          isLocal: true,
        }))
        results.push(...mlResults)
      }
    } catch (e) {
      console.error('ML error:', e.message)
    }
  }

  // 3. Google Shopping (internacional)
  if (SERP_KEY) {
    try {
      const url = new URL('https://serpapi.com/search')
      url.searchParams.set('engine', 'google_shopping')
      url.searchParams.set('q', q)
      url.searchParams.set('gl', config.gl)
      url.searchParams.set('hl', 'es')
      url.searchParams.set('location', config.location)
      url.searchParams.set('num', '10')
      url.searchParams.set('api_key', SERP_KEY)
      const resp = await fetch(url.toString())
      if (resp.ok) {
        const data = await resp.json()
        const serpResults = (data.shopping_results || []).map((item) => ({
          id: item.product_id || String(Math.random()),
          title: item.title,
          price: item.price,
          extractedPrice: item.extracted_price,
          currency: item.currency || currency || 'USD',
          source: item.source,
          link: item.link || item.product_link || null,
          thumbnail: item.thumbnail,
          rating: item.rating,
          reviews: item.reviews,
          delivery: item.delivery,
          isLocal: false,
        }))
        results.push(...serpResults)
      }
    } catch (e) {
      console.error('SERP error:', e.message)
    }
  }

  if (results.length === 0) {
    return res.status(200).json({ results: [], searchQuery: q, country: countryCode })
  }

  results.sort((a, b) => {
    if (a.isLocal && !b.isLocal) return -1
    if (!a.isLocal && b.isLocal) return 1
    return (a.extractedPrice || 999999) - (b.extractedPrice || 999999)
  })

  return res.status(200).json({ results, searchQuery: q, country: countryCode })
}
