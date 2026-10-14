import type { ReactNode } from "react"
import { NavLink } from "react-router-dom"
import type { Shift } from "../arkiv/labels"
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
  return (
    <nav className="society-nav" aria-label="This society">
      <NavLink end to={todayPath(area, society, shift)}>
        Today
      </NavLink>
      <NavLink to={slipPath(area, society, shift)}>Slip</NavLink>
      <NavLink to={filePath(area, society, shift)}>File</NavLink>
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
  const shiftLabel = shift === "morning" ? "Morning" : "Evening"
  return (
    <header className="society">
      <p className="eyebrow">{area}</p>
      <h1>{society}</h1>
      <p>
        {shiftLabel} shift. Readings die at midnight in India.
      </p>
      <SocietyNav area={area} society={society} shift={shift} />
    </header>
  )
}
