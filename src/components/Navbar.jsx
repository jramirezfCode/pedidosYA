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
  const isDark = theme === 'dark'

  const currentLang = LANGUAGES.find((l) => l.code === i18n.language) || LANGUAGES[0]
  const close = () => { setShowCountry(false); setShowLang(false) }

  return (
    <>
      {showCountry || showLang ? (
        <div className="fixed inset-0 z-40" onClick={close} />
      ) : null}

      <nav className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300 ${
        isDark ? 'border-white/5 bg-[#0a0a0b]/90' : 'border-gray-200 bg-white/90'
      }`}>
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">

          <a href="/" className="flex items-center gap-2 select-none">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500">
              <span className="font-display text-xs font-bold text-white">P</span>
            </div>
            <span className={`font-display text-lg font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Precio<span className="text-blue-500">Ya</span>
            </span>
          </a>

          <div className="flex items-center gap-1">

            {/* Country */}
            <div className="relative">
              <button
                onClick={() => { setShowCountry(!showCountry); setShowLang(false) }}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
                  isDark ? 'text-white/70 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span className="text-base leading-none">{country?.flag || '🌎'}</span>
                <span className="hidden text-xs sm:inline">{country ? t(`countries.${country.code}`) : '...'}</span>
                <ChevronDown size={12} className="opacity-50" />
              </button>

              {showCountry && (
                <div className={`absolute right-0 top-full mt-2 w-52 rounded-xl border shadow-2xl ${
                  isDark ? 'border-white/10 bg-[#18181c]' : 'border-gray-200 bg-white'
                }`}>
                  <div className="max-h-80 overflow-y-auto py-1 scrollbar-hide">
                    {COUNTRIES.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => { onChangeCountry(c.code); close() }}
                        className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors ${
                          isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                        } ${
                          country?.code === c.code ? 'text-blue-500' : isDark ? 'text-white/70' : 'text-gray-700'
                        }`}
                      >
                        <span className="text-base">{c.flag}</span>
                        <span className="flex-1">{c.name}</span>
                        <span className={`text-xs ${isDark ? 'text-white/30' : 'text-gray-400'}`}>{c.symbol}</span>
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
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm transition-colors ${
                  isDark ? 'text-white/70 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Globe size={14} />
                <span className="hidden text-xs sm:inline">{currentLang.label}</span>
                <ChevronDown size={12} className="opacity-50" />
              </button>

              {showLang && (
                <div className={`absolute right-0 top-full mt-2 w-36 rounded-xl border shadow-2xl ${
                  isDark ? 'border-white/10 bg-[#18181c]' : 'border-gray-200 bg-white'
                }`}>
                  <div className="py-1">
                    {LANGUAGES.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => { i18n.changeLanguage(l.code); close() }}
                        className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors ${
                          isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                        } ${
                          i18n.language === l.code ? 'text-blue-500' : isDark ? 'text-white/70' : 'text-gray-700'
                        }`}
                      >
                        {l.label}
                        {i18n.language === l.code && (
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
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
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                isDark ? 'text-white/70 hover:bg-white/5 hover:text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
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
