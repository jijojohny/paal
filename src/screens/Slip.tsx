import { FormEvent, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { isHigherFat, isShift, parseQuality } from "../arkiv/labels"
import { fetchSpread } from "../arkiv/readings"
import { SocietyHeader } from "./SocietyHeader"

export function Slip() {
  const params = useParams()
  const area = params.area ?? ""
  const society = params.society ?? ""
  const shift = params.shift
  const [slipFat, setSlipFat] = useState("")
  const [higher, setHigher] = useState<number | null>(null)
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)

  if (!isShift(shift)) {
    return (
      <section>
        <h1>Unknown shift</h1>
        <Link to="/">Open a society</Link>
      </section>
    )
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!isShift(shift)) return
    const parsed = parseQuality(slipFat, "fat")
    if (!parsed) {
      setHigher(null)
      setError("Enter the fat printed on the slip, from 1 to 12.")
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
    <section>
      <SocietyHeader area={area} society={society} shift={shift} />
      <h2>The paper slip</h2>
      <p>This number stays on this page. It is not saved.</p>
      <form onSubmit={(event) => void onSubmit(event)}>
        <label>
          Fat on the slip
          <input
            name="slip-fat"
            inputMode="decimal"
            autoComplete="off"
            value={slipFat}
            onChange={(event) => setSlipFat(event.target.value)}
          />
        </label>
        {error ? <p className="error">{error}</p> : null}
        <button type="submit" disabled={pending}>
          {pending ? "Comparing…" : "Compare"}
        </button>
        <button
          type="button"
          onClick={() => {
            setSlipFat("")
            setHigher(null)
            setError("")
          }}
        >
          Clear slip
        </button>
      </form>
      {higher != null && higher > 1 ? (
        <p className="argue">
          More than one person saw a higher fat than the slip. Argue it.
          <span lang="ta">ஒன்றுக்கு மேற்பட்ட பேர் சீட்டை விட அதிக கொழுப்பு பார்த்தனர். வாதாடுங்கள்.</span>
        </p>
      ) : null}
      {higher != null && higher <= 1 ? (
        <p>One wallet cannot change the society. {higher} reading{higher === 1 ? " is" : "s are"} above this slip.</p>
      ) : null}
    </section>
  )
}
