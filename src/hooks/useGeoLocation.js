import { useState, useEffect } from 'react'
import { getCountryByCode, IP_API_URL } from '../utils/countries'

export function useGeoLocation() {
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cached = localStorage.getItem('precioya_country')
    if (cached) {
      setCountry(getCountryByCode(cached))
      setLoading(false)
      return
    }

    fetch(IP_API_URL)
      .then((r) => r.json())
      .then((data) => {
        const code = (data.country_code || 'pe').toLowerCase()
        const found = getCountryByCode(code)
        setCountry(found)
        localStorage.setItem('precioya_country', found.code)
      })
      .catch(() => {
        setCountry(getCountryByCode('pe'))
      })
      .finally(() => setLoading(false))
  }, [])

  const changeCountry = (code) => {
    const found = getCountryByCode(code)
    setCountry(found)
    localStorage.setItem('precioya_country', found.code)
  }

  return { country, loading, changeCountry }
}
