import { useTranslation } from 'react-i18next'
import { ArrowUpDown, Store } from 'lucide-react'

export default function FiltersBar({ sort, onSortChange, stores, selectedStore, onStoreChange, total }) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-white/40">
        <span className="font-medium text-white/70">{total}</span> {t('search.results')}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        {/* Store filter */}
        {stores.length > 1 && (
          <div className="flex items-center gap-1.5 rounded-xl border border-white/8 bg-white/4 px-3 py-1.5">
            <Store size={13} className="text-white/40" />
            <select
              value={selectedStore}
              onChange={(e) => onStoreChange(e.target.value)}
              className="bg-transparent text-sm text-white/70 outline-none"
            >
              <option value="">{t('filters.allStores')}</option>
              {stores.map((s) => (
                <option key={s} value={s} className="bg-[#18181c]">{s}</option>
              ))}
            </select>
          </div>
        )}

        {/* Sort */}
        <div className="flex items-center gap-1.5 rounded-xl border border-white/8 bg-white/4 px-3 py-1.5">
          <ArrowUpDown size={13} className="text-white/40" />
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-transparent text-sm text-white/70 outline-none"
          >
            <option value="price_asc" className="bg-[#18181c]">{t('filters.sortPrice')}</option>
            <option value="price_desc" className="bg-[#18181c]">{t('filters.sortPriceDesc')}</option>
            <option value="rating" className="bg-[#18181c]">{t('filters.sortRating')}</option>
          </select>
        </div>
      </div>
    </div>
  )
}
