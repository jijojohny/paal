import { FormEvent, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { isHigherFat, isShift, parseQuality } from "../arkiv/labels"
import { fetchSpread } from "../arkiv/readings"
import { SocietyHeader, SocietyScreen } from "./SocietyHeader"

export function Slip() {
  const params = useParams()
  const area = params.area ?? ""
  const society = params.society ?? ""
  const shift = params.shift
  const fatRef = useRef<HTMLInputElement>(null)
  const [slipFat, setSlipFat] = useState("")
  const [higher, setHigher] = useState<number | null>(null)
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)

  if (!isShift(shift)) {
    return (
      <SocietyScreen>
        <h1>Unknown shift</h1>
        <Link className="landing-solid" to="/open">
          Open a society
        </Link>
      </SocietyScreen>
    )
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!isShift(shift)) return
    const parsed = parseQuality(slipFat, "fat")
    if (!parsed) {
      setHigher(null)
      setError("Enter the fat printed on the slip, from 1 to 12.")
      fatRef.current?.focus()
      return
    }
    setPending(true)
    setError("")
    try {
      const rows = await fetchSpread(area, society, shift)
      setHigher(rows.filter((row) => isHigherFat(row.fat, parsed)).length)
    } catch (cause) {
      setHigher(null)
      setError(cause instanceof Error ? cause.message : "The query failed.")
    } finally {
      setPending(false)
    }
  }

  return (
    <SocietyScreen>
      <SocietyHeader area={area} society={society} shift={shift} />
      <h2>The paper slip</h2>
      <p>This number stays on this page. It is not saved.</p>
      <form className="open-form" onSubmit={(event) => void onSubmit(event)} noValidate>
        <label htmlFor="slip-fat">
          Fat on the slip
          <input
            id="slip-fat"
            ref={fatRef}
            name="slip-fat"
            inputMode="decimal"
            autoComplete="off"
            spellCheck={false}
            placeholder="3.5"
            value={slipFat}
            aria-invalid={error !== ""}
            aria-describedby="slip-hint"
            onChange={(event) => {
              setSlipFat(event.target.value)
              if (error) setError("")
            }}
          />
        </label>
        <p id="slip-hint" className={error ? "error" : "hint"}>
          {error || "Required. From 1 to 12. This page forgets it when you leave."}
        </p>
        <div className="form-actions">
          <button type="submit" disabled={pending} aria-busy={pending}>
            {pending ? "Comparing…" : "Compare"}
          </button>
          <button
            className="quiet"
            type="button"
            onClick={() => {
              setSlipFat("")
              setHigher(null)
              setError("")
            }}
          >
            Clear slip
          </button>
        </div>
      </form>
      {higher != null && higher > 1 ? (
        <p className="argue">
          More than one person saw a higher fat than the slip. Argue it.
          <span lang="ta">ஒன்றுக்கு மேற்பட்ட பேர் சீட்டை விட அதிக கொழுப்பு பார்த்தனர். வாதாடுங்கள்.</span>
        </p>
      ) : null}
      {higher != null && higher <= 1 ? (
        <p className="hint">
          One wallet cannot change the society. {higher} reading{higher === 1 ? " is" : "s are"} above this slip.
        </p>
      ) : null}
    </SocietyScreen>
  )
}
