import { Link, NavLink } from "react-router-dom"

export function SiteHeader() {
  return (
    <header className="landing-bar">
      <Link className="landing-mark" to="/">
        <span className="landing-logo" aria-hidden="true" />
        Paal
        <span className="landing-badge">Until midnight</span>
      </Link>
      <nav className="landing-nav" aria-label="Page">
        <NavLink to="/reading">The reading</NavLink>
        <NavLink to="/slip">The slip</NavLink>
        <NavLink to="/wallet">Wallet</NavLink>
      </nav>
      <Link className="landing-solid" to="/open">
        Open a society
      </Link>
    </header>
  )
}
