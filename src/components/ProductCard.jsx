import { useTranslation } from 'react-i18next'
import { Star, ExternalLink, Truck, Tag } from 'lucide-react'

export default function ProductCard({ product, index, isLowest, symbol, theme }) {
  const { t } = useTranslation()
  const isDark = theme === 'dark'

  const discount = product.extractedOldPrice && product.extractedPrice
    ? Math.round(((product.extractedOldPrice - product.extractedPrice) / product.extractedOldPrice) * 100)
    : null

  const handleClick = () => {
    if (product.link) {
      window.open(product.link, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl ${
        isDark
          ? isLowest
            ? 'border-blue-500/40 bg-blue-950/30 hover:shadow-black/30'
            : 'border-white/6 bg-white/3 hover:border-white/10 hover:shadow-black/30'
          : isLowest
            ? 'border-blue-400/50 bg-blue-50 hover:shadow-blue-100'
            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-gray-100'
      }`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {isLowest && (
        <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-blue-500 px-2.5 py-0.5 text-xs font-medium text-white shadow">
          <Tag size={10} />
          {t('product.lowestPrice')}
        </div>
      )}

      {discount && (
        <div className="absolute right-3 top-3 z-10 rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-500">
          -{discount}% {t('product.discount')}
        </div>
      )}

      {/* Image */}
      <div className={`flex h-44 items-center justify-center overflow-hidden p-4 ${isDark ? 'bg-white/4' : 'bg-gray-50'}`}>
        {product.thumbnail ? (
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className={`flex h-20 w-20 items-center justify-center rounded-xl ${isDark ? 'bg-white/5 text-white/20' : 'bg-gray-100 text-gray-300'}`}>
            <span className="text-3xl">📦</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        {/* Store */}
        <p className="mb-1.5 text-xs font-medium uppercase tracking-widest text-blue-500">
          {product.source}
        </p>

        {/* Title */}
        <h3 className={`mb-3 line-clamp-2 flex-1 text-sm font-medium leading-snug ${isDark ? 'text-white/90' : 'text-gray-800'}`}>
          {product.title}
        </h3>

        {/* Rating */}
        {product.rating && (
          <div className="mb-3 flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={11}
                  className={s <= Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : isDark ? 'text-white/15' : 'text-gray-200'}
                />
              ))}
            </div>
            {product.reviews && (
              <span className={`text-xs ${isDark ? 'text-white/35' : 'text-gray-400'}`}>
                ({product.reviews.toLocaleString()} {t('product.reviews')})
              </span>
            )}
          </div>
        )}

        {/* Delivery */}
        {product.delivery && product.delivery.toLowerCase().includes('free') && (
          <div className="mb-3 flex items-center gap-1 text-xs text-green-500">
            <Truck size={11} />
            {t('product.freeDelivery')}
          </div>
        )}

        {/* Price */}
        <div className="mb-4 flex items-end gap-2">
          <span className={`font-display text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {product.price || t('product.noPrice')}
          </span>
          {product.extractedOldPrice && (
            <span className={`mb-0.5 text-sm line-through ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
              {symbol} {product.extractedOldPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={handleClick}
          disabled={!product.link}
          className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-all ${
            product.link
              ? isDark
                ? 'border border-white/10 bg-white/5 text-white/80 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-white'
                : 'border border-gray-200 bg-gray-50 text-gray-700 hover:border-blue-400 hover:bg-blue-500 hover:text-white'
              : 'cursor-not-allowed opacity-40 border border-gray-200 bg-gray-50 text-gray-400'
          }`}
        >
          {t('product.goToStore')}
          <ExternalLink size={13} />
        </button>
      </div>
    </div>
  )
}
