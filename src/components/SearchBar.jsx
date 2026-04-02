import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Search, X, Loader2 } from 'lucide-react'

export default function SearchBar({ onSearch, loading }) {
  const { t } = useTranslation()
  const [value, setValue] = useState('')
  const inputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.trim()) onSearch(value.trim())
  }

  const clear = () => {
    setValue('')
    inputRef.current?.focus()
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="group relative flex items-center">
        <div className="pointer-events-none absolute left-4 text-white/30 transition-colors group-focus-within:text-indigo-400">
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Search size={18} />
          )}
        </div>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={t('search.placeholder')}
          disabled={loading}
          className="h-14 w-full rounded-2xl border border-white/8 bg-white/5 pl-12 pr-28 text-base text-white placeholder-white/25 outline-none transition-all focus:border-indigo-500/50 focus:bg-white/8 focus:ring-1 focus:ring-indigo-500/30 disabled:opacity-60 sm:text-lg"
        />

        {value && !loading && (
          <button
            type="button"
            onClick={clear}
            className="absolute right-[88px] flex h-6 w-6 items-center justify-center rounded-full text-white/30 transition hover:text-white/70"
          >
            <X size={14} />
          </button>
        )}

        <button
          type="submit"
          disabled={!value.trim() || loading}
          className="absolute right-2 h-10 rounded-xl bg-indigo-500 px-4 text-sm font-medium text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {loading ? t('search.searching') : t('search.button')}
        </button>
      </div>

      <p className="mt-2.5 text-center text-xs text-white/25">
        {t('search.example')}
      </p>
    </form>
  )
}
