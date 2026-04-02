import { useTranslation } from 'react-i18next'
import { Star, ExternalLink, Truck, Tag } from 'lucide-react'

export default function ProductCard({ product, index, isLowest, symbol }) {
  const { t } = useTranslation()

  const discount = product.extractedOldPrice && product.extractedPrice
    ? Math.round(((product.extractedOldPrice - product.extractedPrice) / product.extractedOldPrice) * 100)
    : null

  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/30 ${
        isLowest
          ? 'border-indigo-500/40 bg-indigo-950/30'
          : 'border-white/6 bg-white/3 hover:border-white/10'
      }`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {isLowest && (
        <div className="absolute left-3 top-3 z-10 flex items-center gap-1 rounded-full bg-indigo-500 px-2.5 py-0.5 text-xs font-medium text-white shadow">
          <Tag size={10} />
          {t('product.lowestPrice')}
        </div>
      )}

      {discount && (
        <div className="absolute right-3 top-3 z-10 rounded-full bg-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">
          -{discount}% {t('product.discount')}
        </div>
      )}

      {/* Image */}
      <div className="flex h-44 items-center justify-center overflow-hidden bg-white/4 p-4">
        {product.thumbnail ? (
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-white/5 text-white/20">
            <span className="text-3xl">📦</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        {/* Store */}
        <p className="mb-1.5 text-xs font-medium uppercase tracking-widest text-indigo-400">
          {product.source}
        </p>

        {/* Title */}
        <h3 className="mb-3 line-clamp-2 flex-1 text-sm font-medium leading-snug text-white/90">
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
                  className={s <= Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-white/15'}
                />
              ))}
            </div>
            {product.reviews && (
              <span className="text-xs text-white/35">
                ({product.reviews.toLocaleString()} {t('product.reviews')})
              </span>
            )}
          </div>
        )}

        {/* Delivery */}
        {product.delivery && product.delivery.toLowerCase().includes('free') && (
          <div className="mb-3 flex items-center gap-1 text-xs text-green-400">
            <Truck size={11} />
            {t('product.freeDelivery')}
          </div>
        )}

        {/* Price */}
        <div className="mb-4 flex items-end gap-2">
          <span className="font-display text-2xl font-bold text-white">
            {product.price || t('product.noPrice')}
          </span>
          {product.extractedOldPrice && (
            <span className="mb-0.5 text-sm text-white/30 line-through">
              {symbol} {product.extractedOldPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* CTA */}
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-white/80 transition-all hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-white"
        >
          {t('product.goToStore')}
          <ExternalLink size={13} />
        </a>
      </div>
    </div>
  )
}
