import type { ReactNode } from "react"
import { NavLink } from "react-router-dom"
import type { Shift } from "../arkiv/labels"
import { useLanguage } from "../i18n/language"
import { SiteHeader } from "./SiteHeader"
import { filePath, slipPath, todayPath } from "./paths"

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
  const shiftLabel = shift === "morning" ? t.morning : t.evening
  return (
    <header className="society">
      <p className="eyebrow">{area}</p>
      <h1>{society}</h1>
      <p>{t.shiftDies(shiftLabel)}</p>
      <SocietyNav area={area} society={society} shift={shift} />
    </header>
  )
}
