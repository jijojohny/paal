import { useEffect, useState, type ReactNode } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import { minutesUntilMidnight } from "../arkiv/expiry"
import type { Shift } from "../arkiv/labels"
import { useLanguage } from "../i18n/language"
import { SiteHeader } from "./SiteHeader"
import { filePath, sameScreenPath, slipPath, todayPath } from "./paths"

export function SocietyScreen({ children }: { children: ReactNode }) {
  return (
    <div className="landing">
      <SiteHeader />
      <article className="landing-page society-page">{children}</article>
    </div>
  )
}

export function SocietyNav({
  area,
  society,
  shift,
}: {
  area: string
  society: string
  shift: Shift
}) {
  const { t } = useLanguage()
  return (
    <nav className="society-nav" aria-label={t.thisSociety}>
      <NavLink end to={todayPath(area, society, shift)}>
        {t.today}
      </NavLink>
      <NavLink to={slipPath(area, society, shift)}>{t.slip}</NavLink>
      <NavLink to={filePath(area, society, shift)}>{t.file}</NavLink>
    </nav>
  )
}

function useMinutesLeft(): number {
  const [minutes, setMinutes] = useState(() => minutesUntilMidnight())
  useEffect(() => {
    const id = window.setInterval(() => setMinutes(minutesUntilMidnight()), 30_000)
    return () => window.clearInterval(id)
  }, [])
  return minutes
}

export function SocietyHeader({
  area,
  society,
  shift,
}: {
  area: string
  society: string
  shift: Shift
}) {
  const { t } = useLanguage()
  const { pathname } = useLocation()
  const minutes = useMinutesLeft()
  const [notice, setNotice] = useState<"copied" | "failed" | "">("")
  const shiftLabel = shift === "morning" ? t.morning : t.evening
  const pageUrl = window.location.href

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(pageUrl)
      setNotice("copied")
    } catch {
      setNotice("failed")
    }
  }

  return (
    <header className="society">
      <p className="eyebrow">{area}</p>
      <h1>{society}</h1>
      <p>{t.shiftDies(shiftLabel)}</p>
      <p className="time-left">{t.timeLeft(minutes)}</p>
      <div className="shift-switch">
        {(["morning", "evening"] as const).map((item) => (
          <Link
            key={item}
            to={sameScreenPath(area, society, item, pathname)}
            aria-current={item === shift ? "page" : undefined}
          >
            {item === "morning" ? t.morning : t.evening}
          </Link>
        ))}
      </div>
      <SocietyNav area={area} society={society} shift={shift} />
      <div className="share-link">
        <button type="button" className="quiet" onClick={() => void copyLink()}>
          {t.copyLink}
        </button>
        {notice === "copied" ? <p aria-live="polite">{t.linkCopied}</p> : null}
        {notice === "failed" ? (
          <>
            <p className="error" aria-live="polite">
              {t.linkCopyFailed}
            </p>
            <input readOnly value={pageUrl} aria-label={t.copyLink} onFocus={(event) => event.currentTarget.select()} />
          </>
        ) : null}
      </div>
    </header>
  )
}
