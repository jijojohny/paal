import { FormEvent, useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { defaultShift } from "../arkiv/expiry"
import { isDigitsOnly, normalizeLabel, type Place, type Shift } from "../arkiv/labels"
import { listPlaces, rememberPlace } from "../arkiv/places"
import { SiteHeader } from "./SiteHeader"
import { todayPath } from "./paths"

type FieldError = {
  field: "area" | "society"
  message: string
}

export function Open() {
  const navigate = useNavigate()
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
      fail({ field: "area", message: "Enter the district or union." })
      return
    }
    if (!nextSociety) {
      fail({ field: "society", message: "Enter the name painted on the society." })
      return
    }
    if (isDigitsOnly(nextSociety)) {
      fail({ field: "society", message: "Use the name on the building. A number alone is refused." })
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
        <h1>Open a society</h1>
        <p>Name the building. The fat on your paper slip stays on the next screen.</p>
        <form className="open-form" onSubmit={onSubmit} noValidate>
          <label htmlFor="area">
            District or union
            <input
              id="area"
              ref={areaRef}
              name="area"
              autoComplete="address-level2"
              spellCheck={false}
              placeholder="madurai"
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
            {error?.field === "area"
              ? error.message
              : "Required. Two societies with the same name stay apart when the district differs."}
          </p>

          <label htmlFor="society">
            Society name
            <input
              id="society"
              ref={societyRef}
              name="society"
              autoComplete="off"
              spellCheck={false}
              placeholder="aavin society"
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
            {error?.field === "society"
              ? error.message
              : "Required. The name painted on the building."}
          </p>

          <fieldset>
            <legend>Shift</legend>
            <div className="shift-choices">
              <label>
                <input
                  type="radio"
                  name="shift"
                  value="morning"
                  checked={shift === "morning"}
                  onChange={() => setShift("morning")}
                />
                Morning
              </label>
              <label>
                <input
                  type="radio"
                  name="shift"
                  value="evening"
                  checked={shift === "evening"}
                  onChange={() => setShift("evening")}
                />
                Evening
              </label>
            </div>
            <p className="hint">Morning is before 2 in the afternoon in India. Evening is after that.</p>
          </fieldset>

          <button type="submit">Open today</button>
        </form>

        <section className="open-saved">
          <h2>Opened on this phone</h2>
          {places.length === 0 ? (
            <p>Names you open stay on this phone. Fats do not.</p>
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
                </li>
              ))}
            </ul>
          )}
        </section>
      </article>
    </div>
  )
}
