import { FormEvent, useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { FAUCET_URL } from "../arkiv/client"
import { isShift, parseQuality } from "../arkiv/labels"
import { findMine, type OwnReading } from "../arkiv/readings"
import { AlreadyFiled, creatorAddress, fileReading, removeOwnReading } from "../arkiv/write"
import { explainFailure } from "../i18n/copy"
import { useLanguage } from "../i18n/language"
import { todayPath } from "./paths"
import { SocietyHeader, SocietyScreen } from "./SocietyHeader"

export function File() {
  const params = useParams()
  const area = params.area ?? ""
  const society = params.society ?? ""
  const shift = params.shift
  const fatRef = useRef<HTMLInputElement>(null)
  const snfRef = useRef<HTMLInputElement>(null)
  const [fat, setFat] = useState("")
  const [snf, setSnf] = useState("")
  const [mine, setMine] = useState<OwnReading | null>(null)
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")
  const [message, setMessage] = useState("")
  const [invalid, setInvalid] = useState<"fat" | "snf" | null>(null)
  const [pending, setPending] = useState(false)
  const [faucet, setFaucet] = useState(false)
  const [copyNote, setCopyNote] = useState<"" | "copied" | "failed">("")
  const { t } = useLanguage()
  const witness = isShift(shift) ? creatorAddress(area, society, shift) : ""

  useEffect(() => {
    if (!isShift(shift)) return
    let cancelled = false
    setStatus("loading")
    findMine(creatorAddress(area, society, shift), area, society, shift)
      .then((reading) => {
        if (cancelled) return
        setMine(reading)
        setStatus("ready")
      })
      .catch((cause: unknown) => {
        if (cancelled) return
        const explained = explainFailure(cause, t)
        setMessage(explained.text)
        setFaucet(explained.faucet)
        setStatus("error")
      })
    return () => {
      cancelled = true
    }
  }, [area, society, shift, t])

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
    if (!isShift(shift) || mine) return
    const nextFat = parseQuality(fat, "fat")
    const nextSnf = parseQuality(snf, "snf")
    if (!nextFat) {
      setInvalid("fat")
      setFaucet(false)
      setMessage(t.errFat)
      fatRef.current?.focus()
      return
    }
    if (!nextSnf) {
      setInvalid("snf")
      setFaucet(false)
      setMessage(t.errSnf)
      snfRef.current?.focus()
      return
    }
    setPending(true)
    setInvalid(null)
    setFaucet(false)
    setMessage("")
    try {
      setMine(await fileReading(area, society, shift, nextFat, nextSnf))
    } catch (cause) {
      if (cause instanceof AlreadyFiled) {
        setMine(cause.existing)
        return
      }
      const explained = explainFailure(cause, t)
      setMessage(explained.text || t.errWrite)
      setFaucet(explained.faucet)
    } finally {
      setPending(false)
    }
  }

  async function onRemove() {
    if (!mine) return
    setPending(true)
    setFaucet(false)
    setMessage("")
    try {
      if (!isShift(shift)) return
      await removeOwnReading(area, society, shift, mine.key)
      setMine(null)
      setFat("")
      setSnf("")
    } catch (cause) {
      const explained = explainFailure(cause, t)
      setMessage(explained.text || t.errDelete)
      setFaucet(explained.faucet)
    } finally {
      setPending(false)
    }
  }

  return (
    <SocietyScreen>
      <SocietyHeader area={area} society={society} shift={shift} />
      <div className="society-grid society-grid-wide">
        <section className="panel">
          <h2>{t.glassTitle}</h2>
          <p>{t.glassLead}</p>
          {status === "loading" ? <p aria-busy="true">{t.checking}</p> : null}
          {status === "error" ? (
            <div className="panel-alert">
              <p className="error">{message}</p>
              <button
                className="quiet"
                type="button"
                onClick={() => {
                  setStatus("loading")
                  if (!isShift(shift)) return
                  findMine(creatorAddress(area, society, shift), area, society, shift)
                    .then((reading) => {
                      setMine(reading)
                      setMessage("")
                      setFaucet(false)
                      setStatus("ready")
                    })
                    .catch((cause: unknown) => {
                      const explained = explainFailure(cause, t)
                      setMessage(explained.text)
                      setFaucet(explained.faucet)
                      setStatus("error")
                    })
                }}
              >
                {t.tryAgain}
              </button>
            </div>
          ) : null}
          {status === "ready" && mine ? (
            <div className="filed">
              <div className="stats">
                <div className="stat">
                  <span className="stat-label">{t.fat}</span>
                  <strong>{mine.fat}</strong>
                </div>
                <div className="stat">
                  <span className="stat-label">{t.snf}</span>
                  <strong>{mine.snf}</strong>
                </div>
              </div>
              <p>{t.alreadyFiled(mine.fat, mine.snf)}</p>
              <div className="form-actions">
                <Link className="landing-solid" to={todayPath(area, society, shift)}>
                  {t.seeBoard}
                </Link>
                <button className="quiet" type="button" disabled={pending} onClick={() => void onRemove()}>
                  {pending ? t.removing : t.remove}
                </button>
              </div>
            </div>
          ) : null}
          {status === "ready" && !mine ? (
            <form className="open-form" onSubmit={(event) => void onSubmit(event)} noValidate>
              <div className="field-pair">
                <div className="field">
                  <label htmlFor="fat">
                    {t.fat}
                    <input
                      id="fat"
                      ref={fatRef}
                      name="fat"
                      inputMode="decimal"
                      autoComplete="off"
                      spellCheck={false}
                      placeholder="3.5"
                      value={fat}
                      aria-invalid={invalid === "fat"}
                      aria-describedby="fat-hint"
                      onChange={(event) => {
                        setFat(event.target.value)
                        if (invalid === "fat") setInvalid(null)
                      }}
                    />
                  </label>
                  <p id="fat-hint" className={invalid === "fat" ? "error" : "hint"}>
                    {invalid === "fat" ? t.errFat : t.fatHint}
                  </p>
                </div>
                <div className="field">
                  <label htmlFor="snf">
                    {t.snf}
                    <input
                      id="snf"
                      ref={snfRef}
                      name="snf"
                      inputMode="decimal"
                      autoComplete="off"
                      spellCheck={false}
                      placeholder="8.5"
                      value={snf}
                      aria-invalid={invalid === "snf"}
                      aria-describedby="snf-hint"
                      onChange={(event) => {
                        setSnf(event.target.value)
                        if (invalid === "snf") setInvalid(null)
                      }}
                    />
                  </label>
                  <p id="snf-hint" className={invalid === "snf" ? "error" : "hint"}>
                    {invalid === "snf" ? t.errSnf : t.snfHint}
                  </p>
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" disabled={pending} aria-busy={pending}>
                  {pending ? t.filing : t.fileReading}
                </button>
              </div>
            </form>
          ) : null}
          {message && status === "ready" && !invalid ? (
            <p className="error">
              {message} {faucet ? <a href={FAUCET_URL}>{t.getGlm}</a> : null}
            </p>
          ) : null}
        </section>
        {witness ? (
          <aside className="panel witness">
            <h2>{t.witnessForBoard}</h2>
            <p>{t.witnessHint}</p>
            <p className="address">{witness}</p>
            <div className="form-actions">
              <button
                type="button"
                className="quiet"
                onClick={() => {
                  navigator.clipboard.writeText(witness).then(
                    () => setCopyNote("copied"),
                    () => setCopyNote("failed"),
                  )
                }}
              >
                {t.copyAddress}
              </button>
              <a className="landing-ghost" href={FAUCET_URL} target="_blank" rel="noreferrer">
                {t.getGlm}
              </a>
            </div>
            {copyNote === "copied" ? <p aria-live="polite">{t.addressCopied}</p> : null}
            {copyNote === "failed" ? (
              <p className="error" aria-live="polite">
                {t.addressCopyFailed}
              </p>
            ) : null}
          </aside>
        ) : null}
      </div>
    </SocietyScreen>
  )
}
