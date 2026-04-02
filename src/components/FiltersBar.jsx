import { useTranslation } from 'react-i18next'
import { ArrowUpDown, Store } from 'lucide-react'

export default function FiltersBar({ sort, onSortChange, stores, selectedStore, onStoreChange, total, theme }) {
  const { t } = useTranslation()
  const isDark = theme === 'dark'

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className={`text-sm ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
        <span className={`font-medium ${isDark ? 'text-white/70' : 'text-gray-700'}`}>{total}</span> {t('search.results')}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        {stores.length > 1 && (
          <div className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 ${
            isDark ? 'border-white/8 bg-white/4' : 'border-gray-200 bg-white shadow-sm'
          }`}>
            <Store size={13} className={isDark ? 'text-white/40' : 'text-gray-400'} />
            <select
              value={selectedStore}
              onChange={(e) => onStoreChange(e.target.value)}
              className={`bg-transparent text-sm outline-none ${isDark ? 'text-white/70' : 'text-gray-700'}`}
            >
              <option value="" className={isDark ? 'bg-[#18181c]' : 'bg-white'}>{t('filters.allStores')}</option>
              {stores.map((s) => (
                <option key={s} value={s} className={isDark ? 'bg-[#18181c]' : 'bg-white'}>{s}</option>
              ))}
            </select>
          </div>
        )}

        <div className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 ${
          isDark ? 'border-white/8 bg-white/4' : 'border-gray-200 bg-white shadow-sm'
        }`}>
          <ArrowUpDown size={13} className={isDark ? 'text-white/40' : 'text-gray-400'} />
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className={`bg-transparent text-sm outline-none ${isDark ? 'text-white/70' : 'text-gray-700'}`}
          >
            <option value="price_asc" className={isDark ? 'bg-[#18181c]' : 'bg-white'}>{t('filters.sortPrice')}</option>
            <option value="price_desc" className={isDark ? 'bg-[#18181c]' : 'bg-white'}>{t('filters.sortPriceDesc')}</option>
            <option value="rating" className={isDark ? 'bg-[#18181c]' : 'bg-white'}>{t('filters.sortRating')}</option>
          </select>
        </div>
      </div>
    </div>
  )
}
