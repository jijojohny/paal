import { FormEvent, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { fatGap, isHigherFat, isShift, parseQuality } from "../arkiv/labels"
import { fetchSpread, type SpreadRow } from "../arkiv/readings"
import { creatorAddress } from "../arkiv/write"
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
  const [above, setAbove] = useState<SpreadRow[] | null>(null)
  const [slipUsed, setSlipUsed] = useState<string | null>(null)
  const [same, setSame] = useState(0)
  const mine = isShift(shift) ? creatorAddress(area, society, shift) : ""
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
      setAbove(null)
      setSlipUsed(null)
      setSame(0)
      setError("slip")
      fatRef.current?.focus()
      return
    }
    setPending(true)
    setError("")
    try {
      const rows = await fetchSpread(area, society, shift)
      setSlipUsed(parsed)
      setSame(rows.filter((row) => Number(row.fat) === Number(parsed)).length)
      setAbove(
        rows
          .filter((row) => isHigherFat(row.fat, parsed))
          .sort((a, b) => Number(b.fat) - Number(a.fat)),
      )
    } catch (cause) {
      setAbove(null)
      setSlipUsed(null)
      setSame(0)
      setError(explainFailure(cause, t).text)
    } finally {
      setPending(false)
    }
  }

  return (
    <SocietyScreen>
      <SocietyHeader area={area} society={society} shift={shift} />
      <div className="society-grid">
        <section className="panel">
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
                  setAbove(null)
                  setSlipUsed(null)
                  setSame(0)
                  setError("")
                }}
              >
                {t.clearSlip}
              </button>
            </div>
          </form>
        </section>
        <section className="panel" aria-live="polite">
        {above == null ? <p className="panel-wait">{t.slipWaiting}</p> : null}
        {above != null && above.length > 1 ? (
          <p className="argue">
            {t.argue}
            {lang === "ta" ? <span lang="en">{copy.en.argue}</span> : <span lang="ta">{copy.ta.argue}</span>}
          </p>
        ) : null}
        {above != null && above.length <= 1 ? <p className="calm">{t.calm(above.length)}</p> : null}
        {above != null && same > 0 ? <p>{t.sameAsSlip(same)}</p> : null}
        {above != null && above.length > 0 && slipUsed ? (
          <>
            <p className="gap-figure">
              <strong>{fatGap(above[0].fat, slipUsed)}</strong>
              <span>{t.biggestGap}</span>
            </p>
            <h2>{t.aboveSlip}</h2>
            <ul className="board-list">
              {above.map((row) => (
                <li key={row.creator}>
                  <span className="reading-value">
                    <small>{t.fat}</small>
                    <strong>{row.fat}</strong>
                  </span>
                  <span className="reading-value">
                    <small>{t.snf}</small>
                    <strong>{row.snf}</strong>
                  </span>
                  <span className="gap">{t.aboveBy(fatGap(row.fat, slipUsed))}</span>
                  {row.creator.toLowerCase() === mine.toLowerCase() ? <em>{t.thisPhone}</em> : null}
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </section>
      </div>
    </SocietyScreen>
  )
}
