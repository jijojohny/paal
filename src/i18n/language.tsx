import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { copy, htmlLang, type Copy, type Lang } from "./copy"

const KEY = "paal.lang"

function initialLang(): Lang {
  const saved = localStorage.getItem(KEY)
  if (saved === "en" || saved === "ta" || saved === "hi") return saved
  const nav = navigator.language.toLowerCase()
  if (nav.startsWith("ta")) return "ta"
  if (nav.startsWith("hi")) return "hi"
  return "en"
}

type LanguageValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Copy
}

const LanguageContext = createContext<LanguageValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = htmlLang(lang)
    localStorage.setItem(KEY, lang)
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t: copy[lang] }), [lang])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageValue {
  const value = useContext(LanguageContext)
  if (!value) throw new Error("Language is missing")
  return value
}
