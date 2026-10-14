import { FormEvent, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { isHigherFat, isShift, parseQuality } from "../arkiv/labels"
import { fetchSpread } from "../arkiv/readings"
import { copy, explainFailure } from "../i18n/copy"
import { useLanguage } from "../i18n/language"
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
  const { lang, t } = useLanguage()

  if (!isShift(shift)) {
    return (
      <SocietyScreen>
        <h1>{t.unknownShift}</h1>
        <Link className="landing-solid" to="/open">
          {t.openSociety}
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
      setError("slip")
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
      setError(explainFailure(cause, t).text)
    } finally {
      setPending(false)
    }
  }

  return (
    <SocietyScreen>
      <SocietyHeader area={area} society={society} shift={shift} />
      <h2>{t.paperSlip}</h2>
      <p>{t.slipStays}</p>
      <form className="open-form" onSubmit={(event) => void onSubmit(event)} noValidate>
        <label htmlFor="slip-fat">
          {t.fatOnSlip}
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
          {error === "slip" ? t.errSlip : error || t.slipHint}
        </p>
        <div className="form-actions">
          <button type="submit" disabled={pending} aria-busy={pending}>
            {pending ? t.comparing : t.compare}
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
            {t.clearSlip}
          </button>
        </div>
      </form>
      {higher != null && higher > 1 ? (
        <p className="argue">
          {t.argue}
          {lang === "ta" ? <span lang="en">{copy.en.argue}</span> : <span lang="ta">{copy.ta.argue}</span>}
        </p>
      ) : null}
      {higher != null && higher <= 1 ? <p className="hint">{t.calm(higher)}</p> : null}
    </SocietyScreen>
  )
}
