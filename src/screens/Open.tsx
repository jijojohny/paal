import { FormEvent, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { defaultShift } from "../arkiv/expiry"
import { isDigitsOnly, normalizeLabel, type Place, type Shift } from "../arkiv/labels"
import { forgetPlace, listPlaces, rememberPlace } from "../arkiv/places"
import { useLanguage } from "../i18n/language"
import { SiteHeader } from "./SiteHeader"
import { todayPath } from "./paths"

type OpenError = "errArea" | "errSociety" | "errDigits"

type FieldError = {
  field: "area" | "society"
  key: OpenError
}

export function Open() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const areaRef = useRef<HTMLInputElement>(null)
  const societyRef = useRef<HTMLInputElement>(null)
  const [area, setArea] = useState("")
  const [society, setSociety] = useState("")
  const [shift, setShift] = useState<Shift>(defaultShift)
  const [error, setError] = useState<FieldError | null>(null)
  const [places, setPlaces] = useState<Place[]>(() => listPlaces())

  function fail(next: FieldError) {
    setError(next)
    const field = next.field === "area" ? areaRef.current : societyRef.current
    field?.focus()
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const nextArea = normalizeLabel(area)
    const nextSociety = normalizeLabel(society)
    if (!nextArea) {
      fail({ field: "area", key: "errArea" })
      return
    }
    if (!nextSociety) {
      fail({ field: "society", key: "errSociety" })
      return
    }
    if (isDigitsOnly(nextSociety)) {
      fail({ field: "society", key: "errDigits" })
      return
    }
    setError(null)
    rememberPlace({ area: nextArea, society: nextSociety })
    setPlaces(listPlaces())
    navigate(todayPath(nextArea, nextSociety, shift))
  }

  return (
    <div className="landing">
      <SiteHeader />
      <article className="landing-page">
        <h1>{t.openSociety}</h1>
        <p>{t.openLead}</p>
        <form className="open-form" onSubmit={onSubmit} noValidate>
          <label htmlFor="area">
            {t.district}
            <input
              id="area"
              ref={areaRef}
              name="area"
              autoComplete="address-level2"
              spellCheck={false}
              placeholder={t.areaPlaceholder}
              value={area}
              aria-invalid={error?.field === "area"}
              aria-describedby="area-hint"
              onChange={(event) => {
                setArea(event.target.value)
                if (error?.field === "area") setError(null)
              }}
            />
          </label>
          <p id="area-hint" className={error?.field === "area" ? "error" : "hint"}>
            {error?.field === "area" ? t[error.key] : t.areaHint}
          </p>

          <label htmlFor="society">
            {t.society}
            <input
              id="society"
              ref={societyRef}
              name="society"
              autoComplete="off"
              spellCheck={false}
              placeholder={t.societyPlaceholder}
              value={society}
              aria-invalid={error?.field === "society"}
              aria-describedby="society-hint"
              onChange={(event) => {
                setSociety(event.target.value)
                if (error?.field === "society") setError(null)
              }}
            />
          </label>
          <p id="society-hint" className={error?.field === "society" ? "error" : "hint"}>
            {error?.field === "society" ? t[error.key] : t.societyHint}
          </p>

          <fieldset>
            <legend>{t.shift}</legend>
            <div className="shift-choices">
              <label>
                <input
                  type="radio"
                  name="shift"
                  value="morning"
                  checked={shift === "morning"}
                  onChange={() => setShift("morning")}
                />
                {t.morning}
              </label>
              <label>
                <input
                  type="radio"
                  name="shift"
                  value="evening"
                  checked={shift === "evening"}
                  onChange={() => setShift("evening")}
                />
                {t.evening}
              </label>
            </div>
            <p className="hint">{t.shiftHint}</p>
          </fieldset>

          <button type="submit">{t.openToday}</button>
        </form>

        <section className="open-saved">
          <h2>{t.opened}</h2>
          {places.length === 0 ? (
            <p>{t.openedEmpty}</p>
          ) : (
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
          )}
        </section>
      </article>
    </div>
  )
}
