import { Link } from "react-router-dom"
import type { Shift } from "../arkiv/labels"
import { filePath, slipPath, todayPath } from "./paths"

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
    <nav className="subnav" aria-label="This society">
      <Link to={todayPath(area, society, shift)}>Today</Link>
      <Link to={slipPath(area, society, shift)}>Slip</Link>
      <Link to={filePath(area, society, shift)}>File</Link>
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
