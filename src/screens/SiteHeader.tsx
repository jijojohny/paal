import { useEffect, useRef, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import type { Lang } from "../i18n/copy"
import { useLanguage } from "../i18n/language"
import { Logo } from "./Logo"

const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "ta", label: "தமிழ்" },
  { code: "hi", label: "हिन्दी" },
]

export function SiteHeader() {
  const { lang, setLang, t } = useLanguage()
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const current = LANGS.find((item) => item.code === lang) ?? LANGS[0]

  useEffect(() => {
    if (!open) return
    function onPointer(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return
      setOpen(false)
      buttonRef.current?.focus()
    }
    document.addEventListener("pointerdown", onPointer)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("pointerdown", onPointer)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <header className="landing-bar">
      <Link className="landing-mark" to="/">
        <Logo />
        Paal
        <span className="landing-badge">{t.untilMidnight}</span>
      </Link>
      <nav className="landing-nav" aria-label="Page">
        <NavLink to="/problem">{t.problem}</NavLink>
        <NavLink to="/reading">{t.reading}</NavLink>
        <NavLink to="/slip">{t.slip}</NavLink>
        <NavLink to="/wallet">{t.wallet}</NavLink>
      </nav>
      <div className="lang-switch" ref={rootRef}>
        <button
          ref={buttonRef}
          type="button"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label={t.language}
          onClick={() => setOpen((value) => !value)}
        >
          {current.label}
        </button>
        {open ? (
          <ul className="lang-menu" role="menu" aria-label={t.language}>
            {LANGS.map((item) => (
              <li key={item.code} role="none">
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={lang === item.code}
                  onClick={() => {
                    setLang(item.code)
                    setOpen(false)
                    buttonRef.current?.focus()
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      <Link className="landing-solid" to="/open">
        {t.openSociety}
      </Link>
    </header>
  )
}
