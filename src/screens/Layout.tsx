import { Link, NavLink, Outlet } from "react-router-dom"

export function Layout() {
  return (
    <div className="app">
      <header className="top">
        <Link className="mark" to="/">
          Paal
        </Link>
        <NavLink to="/wallet">Wallet</NavLink>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
