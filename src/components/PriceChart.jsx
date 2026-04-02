import { useTranslation } from 'react-i18next'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts'
import { TrendingDown, TrendingUp, Minus } from 'lucide-react'

const CustomTooltip = ({ active, payload, label, symbol }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-white/10 bg-[#18181c] px-3 py-2 shadow-xl">
      <p className="mb-1 text-xs text-white/40">{label}</p>
      <p className="font-display text-base font-bold text-white">
        {symbol} {payload[0].value?.toLocaleString()}
      </p>
    </div>
  )
}

export default function PriceChart({ history, symbol, query }) {
  const { t } = useTranslation()

  if (!history?.length) {
    return (
      <div className="flex h-48 items-center justify-center rounded-2xl border border-white/6 bg-white/3">
        <p className="text-sm text-white/30">{t('history.noData')}</p>
      </div>
    )
  }

  const prices = history.map((h) => h.price)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const currentPrice = history[history.length - 1]?.price
  const firstPrice = history[0]?.price
  const trend = currentPrice - firstPrice
  const trendPct = firstPrice ? Math.round((trend / firstPrice) * 100) : 0

  const TrendIcon = trend < 0 ? TrendingDown : trend > 0 ? TrendingUp : Minus
  const trendColor = trend < 0 ? 'text-green-400' : trend > 0 ? 'text-red-400' : 'text-white/40'

  return (
    <div className="rounded-2xl border border-white/6 bg-white/3 p-5">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-base font-semibold text-white">
            {t('history.title')}
          </h2>
          {query && (
            <p className="mt-0.5 text-xs text-white/35">{query}</p>
          )}
        </div>

        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-xs text-white/40">{t('history.lowestEver')}</p>
            <p className="font-display text-sm font-bold text-green-400">
              {symbol} {minPrice.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/40">{t('history.currentPrice')}</p>
            <p className="font-display text-sm font-bold text-white">
              {symbol} {currentPrice?.toLocaleString()}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/40">Tendencia</p>
            <p className={`flex items-center gap-1 font-display text-sm font-bold ${trendColor}`}>
              <TrendIcon size={13} />
              {trendPct > 0 ? '+' : ''}{trendPct}%
            </p>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={history} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis
            dataKey="month"
            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${symbol}${(v / 1000).toFixed(0)}k`}
            width={48}
          />
          <Tooltip content={<CustomTooltip symbol={symbol} />} />
          <ReferenceLine
            y={minPrice}
            stroke="#22c55e"
            strokeDasharray="4 4"
            strokeOpacity={0.5}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#6366f1"
            strokeWidth={2}
            fill="url(#priceGrad)"
            dot={(props) => {
              const { cx, cy, payload } = props
              if (payload.isLowest) {
                return <circle key={`dot-${cx}`} cx={cx} cy={cy} r={4} fill="#22c55e" stroke="#0a0a0b" strokeWidth={2} />
              }
              if (payload.isCurrent) {
                return <circle key={`dot-${cx}`} cx={cx} cy={cy} r={4} fill="#6366f1" stroke="#0a0a0b" strokeWidth={2} />
              }
              return <circle key={`dot-${cx}`} cx={cx} cy={cy} r={2} fill="#6366f1" fillOpacity={0.5} />
            }}
            activeDot={{ r: 5, fill: '#818cf8', stroke: '#0a0a0b', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
