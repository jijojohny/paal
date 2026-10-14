import { Link } from "react-router-dom"
import { SiteHeader } from "./SiteHeader"

const FACTS = [
  "One phone, one reading",
  "The slip is never stored",
  "Readings die at midnight",
  "More than one wallet to argue",
]

export function Landing() {
  return (
    <div className="landing">
      <SiteHeader />

      <p className="landing-ticker">
        {FACTS.map((fact) => (
          <span key={fact}>{fact}</span>
        ))}
      </p>

      <section className="landing-hero">
        <div className="landing-copy">
          <h1>
            The fat on the
            <br />
            glass.
            <span className="landing-accent" aria-hidden="true" />
            <br />
            The slip stays on paper.
          </h1>
          <p>
            A pourer types the fat printed on the paper slip. Other phones record the fat and SNF
            they saw on the analyser. The slip is never stored. The readings die at midnight.
          </p>
          <div className="landing-actions">
            <Link className="landing-solid" to="/open">
              Open a society
            </Link>
            <Link className="landing-ghost" to="/reading">
              How a reading works
            </Link>
          </div>
          <ul className="landing-chips">
            <li>Morning</li>
            <li>Evening</li>
            <li>Fat</li>
            <li>SNF</li>
          </ul>
        </div>

        <div className="landing-board">
          <article>
            <h2>On the glass</h2>
            <p>Fat and SNF other phones file for this society and this shift. One phone, one reading.</p>
          </article>
          <article>
            <h2>On the slip</h2>
            <p>The number on the paper. Compared on that screen, and never written.</p>
          </article>
        </div>
      </section>
    </div>
  )
}
