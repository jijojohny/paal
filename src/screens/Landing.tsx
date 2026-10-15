import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { defaultShift } from "../arkiv/expiry"
import type { Place } from "../arkiv/labels"
import { forgetPlace, listPlaces } from "../arkiv/places"
import { useLanguage } from "../i18n/language"
import { SiteHeader } from "./SiteHeader"
import { todayPath } from "./paths"

export function Landing() {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [places, setPlaces] = useState<Place[]>(() => listPlaces())
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
          {places.length > 0 ? (
            <article className="landing-saved">
              <h2>{t.opened}</h2>
              <ul className="open-places">
                {places.map((place) => (
                  <li key={`${place.area}/${place.society}`}>
                    <Link
                      to={todayPath(place.area, place.society, defaultShift())}
                      onClick={(event) => {
                        event.preventDefault()
                        navigate(todayPath(place.area, place.society, defaultShift()))
                      }}
                    >
                      {place.society}
                      <span>{place.area}</span>
                    </Link>
                    <button
                      type="button"
                      className="quiet"
                      aria-label={t.forgetPlaceLabel(place.society)}
                      onClick={() => setPlaces(forgetPlace(place))}
                    >
                      {t.forgetPlace}
                    </button>
                  </li>
                ))}
              </ul>
            </article>
          ) : null}
        </div>
      </section>
    </div>
  )
}
