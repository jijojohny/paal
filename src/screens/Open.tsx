import { FormEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { defaultShift } from "../arkiv/expiry"
import { isDigitsOnly, normalizeLabel, type Shift } from "../arkiv/labels"
import { listPlaces, rememberPlace } from "../arkiv/places"
import { todayPath } from "./paths"

export function Open() {
  const navigate = useNavigate()
  const [area, setArea] = useState("")
  const [society, setSociety] = useState("")
  const [shift, setShift] = useState<Shift>(defaultShift)
  const [error, setError] = useState("")
  const places = listPlaces()

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    const nextArea = normalizeLabel(area)
    const nextSociety = normalizeLabel(society)
    if (!nextArea || !nextSociety) {
      setError("Enter the district or union, and the name painted on the society.")
      return
    }
    if (isDigitsOnly(nextSociety)) {
      setError("Use the name on the building. A number alone is refused.")
      return
    }
    rememberPlace({ area: nextArea, society: nextSociety })
    navigate(todayPath(nextArea, nextSociety, shift))
  }

  return (
    <section>
      <h1>Open a society</h1>
      <p>Name the building. The fat on your paper slip stays on the next screen.</p>
      <form onSubmit={onSubmit}>
        <label>
          District or union
          <input
            name="area"
            autoComplete="address-level2"
            value={area}
            onChange={(event) => setArea(event.target.value)}
          />
        </label>
        <label>
          Society name
          <input
            name="society"
            autoComplete="off"
            value={society}
            onChange={(event) => setSociety(event.target.value)}
          />
        </label>
        <fieldset>
          <legend>Shift</legend>
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
        </fieldset>
        {error ? <p className="error">{error}</p> : null}
        <button type="submit">Open today</button>
      </form>
      {places.length > 0 ? (
        <section>
          <h2>Opened on this phone</h2>
          <ul className="places">
            {places.map((place) => (
              <li key={`${place.area}/${place.society}`}>
                <Link to={todayPath(place.area, place.society, defaultShift())}>
                  {place.society}
                  <span>{place.area}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </section>
  )
}
