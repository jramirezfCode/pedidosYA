const MONTHS_ES = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
const MONTHS_EN = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
const MONTHS_PT = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']

export function getMonthNames(lang = 'es') {
  if (lang === 'en') return MONTHS_EN
  if (lang === 'pt') return MONTHS_PT
  return MONTHS_ES
}

export function generatePriceHistory(currentPrice, lang = 'es') {
  if (!currentPrice || currentPrice <= 0) return []
  const months = getMonthNames(lang)
  const now = new Date()
  const history = []

  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthIdx = d.getMonth()
    const year = d.getFullYear()
    const variance = (Math.random() - 0.4) * 0.18
    const price = Math.round(currentPrice * (1 + variance))
    history.push({
      month: `${months[monthIdx]} ${year !== now.getFullYear() ? year : ''}`.trim(),
      price,
      isLowest: false,
      isCurrent: i === 0,
    })
  }

  const minPrice = Math.min(...history.map((h) => h.price))
  history.forEach((h) => {
    if (h.price === minPrice) h.isLowest = true
  })

  return history
}

export function formatPrice(price, symbol = 'S/', lang = 'es') {
  if (!price && price !== 0) return '—'
  const formatted = new Intl.NumberFormat(
    lang === 'en' ? 'en-US' : lang === 'pt' ? 'pt-BR' : 'es-PE',
    { minimumFractionDigits: 0, maximumFractionDigits: 2 }
  ).format(price)
  return `${symbol} ${formatted}`
}
