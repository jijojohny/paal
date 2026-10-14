import { Link } from "react-router-dom"
import { useLanguage } from "../i18n/language"
import { SiteHeader } from "./SiteHeader"

export function Landing() {
  const { t } = useLanguage()
  return (
    <div className="landing">
      <SiteHeader />

      <p className="landing-ticker">
        {t.facts.map((fact) => (
          <span key={fact}>{fact}</span>
        ))}
      </p>

      <section className="landing-hero">
        <div className="landing-copy">
          <h1>
            {t.line1}
            <br />
            {t.line2}
            <span className="landing-accent" aria-hidden="true" />
            <br />
            {t.line3}
          </h1>
          <p>{t.hero}</p>
          <div className="landing-actions">
            <Link className="landing-solid" to="/open">
              {t.openSociety}
            </Link>
            <Link className="landing-ghost" to="/reading">
              {t.howReading}
            </Link>
          </div>
          <ul className="landing-chips">
            <li>{t.morning}</li>
            <li>{t.evening}</li>
            <li>{t.fat}</li>
            <li>{t.snf}</li>
          </ul>
        </div>

        <div className="landing-board">
          <article>
            <h2>{t.onGlass}</h2>
            <p>{t.onGlassBody}</p>
          </article>
          <article>
            <h2>{t.onSlip}</h2>
            <p>{t.onSlipBody}</p>
          </article>
        </div>
      </section>
    </div>
  )
}
