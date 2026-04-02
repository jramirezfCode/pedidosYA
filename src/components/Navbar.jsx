import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Sun, Moon, Globe, ChevronDown } from 'lucide-react'
import { COUNTRIES } from '../utils/countries'

const LANGUAGES = [
  { code: 'es', label: 'Español' },
  { code: 'en', label: 'English' },
  { code: 'pt', label: 'Português' },
]

export default function Navbar({ theme, onToggleTheme, country, onChangeCountry }) {
  const { t, i18n } = useTranslation()
  const [showCountry, setShowCountry] = useState(false)
  const [showLang, setShowLang] = useState(false)

  const currentLang = LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0]

  const close = () => { setShowCountry(false); setShowLang(false) }

  return (
    <>
      {showCountry || showLang ? (
        <div className="fixed inset-0 z-40" onClick={close} />
      ) : null}

      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0b]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">

          <a href="/" className="flex items-center gap-2 select-none">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500">
              <span className="font-display text-xs font-bold text-white">P</span>
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-white">
              Precio<span className="text-indigo-400">Ya</span>
            </span>
          </a>

          <div className="flex items-center gap-1">

            {/* Country */}
            <div className="relative">
              <button
                onClick={() => { setShowCountry(!showCountry); setShowLang(false) }}
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              >
                <span className="text-base leading-none">{country?.flag || '🌎'}</span>
                <span className="hidden text-xs sm:inline">{country ? t(`countries.${country.code}`) : '...'}</span>
                <ChevronDown size={12} className="opacity-50" />
              </button>

              {showCountry && (
                <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-white/10 bg-[#18181c] shadow-2xl">
                  <div className="max-h-80 overflow-y-auto py-1 scrollbar-hide">
                    {COUNTRIES.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => { onChangeCountry(c.code); close() }}
                        className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors hover:bg-white/5 ${
                          country?.code === c.code ? 'text-indigo-400' : 'text-white/70'
                        }`}
                      >
                        <span className="text-base">{c.flag}</span>
                        <span className="flex-1">{c.name}</span>
                        <span className="text-xs text-white/30">{c.symbol}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Language */}
            <div className="relative">
              <button
                onClick={() => { setShowLang(!showLang); setShowCountry(false) }}
                className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              >
                <Globe size={14} />
                <span className="hidden text-xs sm:inline">{currentLang.label}</span>
                <ChevronDown size={12} className="opacity-50" />
              </button>

              {showLang && (
                <div className="absolute right-0 top-full mt-2 w-36 rounded-xl border border-white/10 bg-[#18181c] shadow-2xl">
                  <div className="py-1">
                    {LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { i18n.changeLanguage(l.code); close() }}
                        className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors hover:bg-white/5 ${
                          i18n.language === l.code ? 'text-indigo-400' : 'text-white/70'
                        }`}
                      >
                        {l.label}
                        {i18n.language === l.code && (
                          <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Theme toggle */}
            <button
              onClick={onToggleTheme}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/5 hover:text-white"
              title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
            >
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}
