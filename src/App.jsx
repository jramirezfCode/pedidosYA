import { useState, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import './i18n'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import ProductCard from './components/ProductCard'
import FiltersBar from './components/FiltersBar'
import PriceChart from './components/PriceChart'
import PriceTable from './components/PriceTable'
import SkeletonCard from './components/SkeletonCard'
import { useGeoLocation } from './hooks/useGeoLocation'
import { useTheme } from './hooks/useTheme'
import { generatePriceHistory } from './utils/priceHistory'

export default function App() {
  const { t, i18n } = useTranslation()
  const { theme, toggle: toggleTheme } = useTheme()
  const { country, changeCountry } = useGeoLocation()

  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [searched, setSearched] = useState(false)
  const [sort, setSort] = useState('price_asc')
  const [selectedStore, setSelectedStore] = useState('')
  const [priceHistory, setPriceHistory] = useState([])

  const handleSearch = async (q) => {
    if (!country) return
    setLoading(true)
    setError(null)
    setQuery(q)
    setSearched(true)
    setSelectedStore('')

    try {
      const params = new URLSearchParams({
        q,
        country: country.code,
        hl: i18n.language,
        currency: country.currency,
      })
      const res = await fetch(`/api/search?${params}`)
      if (!res.ok) throw new Error('Error al buscar')
      const data = await res.json()
      setResults(data.results || [])

      const lowestPrice = data.results?.[0]?.extractedPrice
      if (lowestPrice) {
        setPriceHistory(generatePriceHistory(lowestPrice, i18n.language))
      }
    } catch (err) {
      setError(err.message)
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const stores = useMemo(() => {
    const s = [...new Set(results.map((r) => r.source).filter(Boolean))]
    return s.sort()
  }, [results])

  const filtered = useMemo(() => {
    let list = [...results]
    if (selectedStore) list = list.filter((r) => r.source === selectedStore)
    if (sort === 'price_asc') list.sort((a, b) => (a.extractedPrice || 9999999) - (b.extractedPrice || 9999999))
    if (sort === 'price_desc') list.sort((a, b) => (b.extractedPrice || 0) - (a.extractedPrice || 0))
    if (sort === 'rating') list.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    return list
  }, [results, sort, selectedStore])

  const lowestPrice = useMemo(() => {
    const prices = results.map((r) => r.extractedPrice).filter(Boolean)
    return prices.length ? Math.min(...prices) : null
  }, [results])

  const symbol = country?.symbol || 'S/'
  const isDark = theme === 'dark'

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0a0a0b] text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        country={country}
        onChangeCountry={changeCountry}
      />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-12 text-center">
          <h1 className={`font-display mb-2 text-3xl font-bold tracking-tight sm:text-4xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('tagline')}
          </h1>
          {country && (
            <p className={`mb-8 text-sm ${isDark ? 'text-white/35' : 'text-gray-500'}`}>
              {country.flag} {t(`countries.${country.code}`)} · {country.currency}
            </p>
          )}
          <div className="mx-auto max-w-2xl">
            <SearchBar onSearch={handleSearch} loading={loading} theme={theme} />
          </div>
        </div>

        {error && (
          <div className="mb-8 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <SkeletonCard key={i} theme={theme} />
            ))}
          </div>
        )}

        {!loading && searched && (
          <>
            {filtered.length === 0 ? (
              <div className="py-20 text-center">
                <p className={`text-lg ${isDark ? 'text-white/40' : 'text-gray-400'}`}>{t('search.noResults')} "{query}"</p>
                <p className={`mt-1 text-sm ${isDark ? 'text-white/25' : 'text-gray-300'}`}>{t('search.tryAnother')}</p>
              </div>
            ) : (
              <>
                <div className="mb-5">
                  <FiltersBar
                    sort={sort}
                    onSortChange={setSort}
                    stores={stores}
                    selectedStore={selectedStore}
                    onStoreChange={setSelectedStore}
                    total={filtered.length}
                    theme={theme}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {filtered.map((product, i) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={i}
                      isLowest={product.extractedPrice === lowestPrice}
                      symbol={symbol}
                      theme={theme}
                    />
                  ))}
                </div>

                {priceHistory.length > 0 && (
                  <div className="mt-12 grid gap-5 lg:grid-cols-2">
                    <PriceChart history={priceHistory} symbol={symbol} query={query} />
                    <PriceTable history={priceHistory} symbol={symbol} />
                  </div>
                )}
              </>
            )}
          </>
        )}

        {!loading && !searched && (
          <div className="py-24 text-center">
            <div className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border ${isDark ? 'border-white/8 bg-white/3' : 'border-gray-200 bg-white'}`}>
              <span className="text-2xl">🔍</span>
            </div>
            <p className={isDark ? 'text-white/30' : 'text-gray-400'}>{t('history.noData')}</p>
          </div>
        )}
      </main>

      <footer className={`mt-20 border-t py-6 text-center text-xs ${isDark ? 'border-white/5 text-white/20' : 'border-gray-200 text-gray-400'}`}>
        {t('footer')} · PrecioYa {new Date().getFullYear()}
      </footer>
    </div>
  )
}
