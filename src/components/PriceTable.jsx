import { useTranslation } from 'react-i18next'
import { TrendingDown, TrendingUp, Minus } from 'lucide-react'

export default function PriceTable({ history, symbol }) {
  const { t } = useTranslation()

  if (!history?.length) return null

  const currentPrice = history[history.length - 1]?.price

  return (
    <div className="rounded-2xl border border-white/6 bg-white/3 p-5">
      <h2 className="mb-4 font-display text-base font-semibold text-white">
        {t('history.table')}
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/6">
              <th className="pb-2.5 text-left text-xs font-medium text-white/40">{t('history.month')}</th>
              <th className="pb-2.5 text-right text-xs font-medium text-white/40">{t('history.price')}</th>
              <th className="pb-2.5 text-right text-xs font-medium text-white/40">vs actual</th>
              <th className="pb-2.5 text-right text-xs font-medium text-white/40"></th>
            </tr>
          </thead>
          <tbody>
            {[...history].reverse().map((row, i) => {
              const diff = currentPrice ? row.price - currentPrice : 0
              const diffPct = currentPrice ? Math.round((diff / currentPrice) * 100) : 0
              const Icon = diff < 0 ? TrendingDown : diff > 0 ? TrendingUp : Minus
              const color = diff < 0 ? 'text-green-400' : diff > 0 ? 'text-red-400' : 'text-white/30'

              return (
                <tr
                  key={i}
                  className={`border-b border-white/4 transition-colors hover:bg-white/3 ${
                    row.isCurrent ? 'bg-indigo-500/5' : ''
                  }`}
                >
                  <td className="py-2.5 text-white/70">
                    {row.month}
                    {row.isCurrent && (
                      <span className="ml-2 rounded-full bg-indigo-500/20 px-1.5 py-0.5 text-xs text-indigo-400">
                        actual
                      </span>
                    )}
                  </td>
                  <td className="py-2.5 text-right">
                    <span className={`font-mono font-medium ${row.isLowest ? 'text-green-400' : 'text-white'}`}>
                      {symbol} {row.price.toLocaleString()}
                    </span>
                  </td>
                  <td className={`py-2.5 text-right font-mono text-xs ${color}`}>
                    {row.isCurrent ? '—' : `${diffPct > 0 ? '+' : ''}${diffPct}%`}
                  </td>
                  <td className="py-2.5 pl-3 text-right">
                    {row.isLowest && (
                      <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-xs text-green-400">
                        min
                      </span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
