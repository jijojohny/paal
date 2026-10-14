import { Link } from "react-router-dom"
import { SiteHeader } from "./SiteHeader"

export function AboutSlip() {
  return (
    <div className="landing">
      <SiteHeader />
      <article className="landing-page">
        <h1>The slip</h1>
        <p>The number on the paper stays on that screen. It is compared here and never written.</p>
        <p>A pourer types the fat printed on the paper slip. The slip is never stored.</p>
        <Link className="landing-solid" to="/open">
          Open a society
        </Link>
      </article>
    </div>
  )
}
