export const COUNTRIES = [
  { code: 'pe', name: 'Perú',          flag: '🇵🇪', currency: 'PEN', symbol: 'S/',  lang: 'es' },
  { code: 'mx', name: 'México',        flag: '🇲🇽', currency: 'MXN', symbol: '$',   lang: 'es' },
  { code: 'ar', name: 'Argentina',     flag: '🇦🇷', currency: 'ARS', symbol: '$',   lang: 'es' },
  { code: 'cl', name: 'Chile',         flag: '🇨🇱', currency: 'CLP', symbol: '$',   lang: 'es' },
  { code: 'co', name: 'Colombia',      flag: '🇨🇴', currency: 'COP', symbol: '$',   lang: 'es' },
  { code: 'us', name: 'Estados Unidos',flag: '🇺🇸', currency: 'USD', symbol: '$',   lang: 'en' },
  { code: 'es', name: 'España',        flag: '🇪🇸', currency: 'EUR', symbol: '€',   lang: 'es' },
  { code: 'br', name: 'Brasil',        flag: '🇧🇷', currency: 'BRL', symbol: 'R$',  lang: 'pt' },
  { code: 'uy', name: 'Uruguay',       flag: '🇺🇾', currency: 'UYU', symbol: '$',   lang: 'es' },
  { code: 'ec', name: 'Ecuador',       flag: '🇪🇨', currency: 'USD', symbol: '$',   lang: 'es' },
  { code: 'bo', name: 'Bolivia',       flag: '🇧🇴', currency: 'BOB', symbol: 'Bs',  lang: 'es' },
  { code: 'py', name: 'Paraguay',      flag: '🇵🇾', currency: 'PYG', symbol: '₲',   lang: 'es' },
  { code: 've', name: 'Venezuela',     flag: '🇻🇪', currency: 'USD', symbol: '$',   lang: 'es' },
]

export const getCountryByCode = (code) =>
  COUNTRIES.find((c) => c.code === code.toLowerCase()) || COUNTRIES[0]

export const IP_API_URL = 'https://ipapi.co/json/'
export const EXCHANGE_API_URL = 'https://open.er-api.com/v6/latest/USD'
