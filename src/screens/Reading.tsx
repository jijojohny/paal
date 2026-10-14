import { Link } from "react-router-dom"
import { SiteHeader } from "./SiteHeader"

export function Reading() {
  return (
    <div className="landing">
      <SiteHeader />
      <article className="landing-page">
        <h1>The reading</h1>
        <p>One phone files one fat and one SNF for this society and this shift. A second filing is refused.</p>
        <p>Fat and SNF other phones file for this society and this shift. One phone, one reading.</p>
        <Link className="landing-solid" to="/open">
          Open a society
        </Link>
      </article>
    </div>
  )
}
