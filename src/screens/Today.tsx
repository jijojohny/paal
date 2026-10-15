import { useCallback, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { creatorAddress } from "../arkiv/write"
import { isShift } from "../arkiv/labels"
import { fetchSpread, type SpreadRow } from "../arkiv/readings"
import { watchReadings } from "../arkiv/watch"
import { explainFailure } from "../i18n/copy"
import { useLanguage } from "../i18n/language"
import { SocietyHeader, SocietyScreen } from "./SocietyHeader"
import { filePath, slipPath } from "./paths"
import { useIstDate } from "./useIstDate"

function byFat(rows: SpreadRow[]): SpreadRow[] {
  return [...rows].sort((a, b) => Number(b.fat) - Number(a.fat) || Number(b.snf) - Number(a.snf))
}

function spreadText(rows: SpreadRow[]): string {
  let low = rows[0]
  let high = rows[0]
  for (const row of rows) {
    if (Number(row.fat) < Number(low.fat)) low = row
    if (Number(row.fat) > Number(high.fat)) high = row
  }
  return Number(low.fat) === Number(high.fat) ? low.fat : `${low.fat}–${high.fat}`
}

function isThisPhone(creator: string, mine: string): boolean {
  return creator.toLowerCase() === mine.toLowerCase()
}

type Status = "loading" | "ready" | "error"

export function Today() {
  const params = useParams()
  const area = params.area ?? ""
  const society = params.society ?? ""
  const shift = params.shift
  const [status, setStatus] = useState<Status>("loading")
  const [rows, setRows] = useState<SpreadRow[]>([])
  const [message, setMessage] = useState("")
  const [live, setLive] = useState<"on" | "off">("on")
  const [attempt, setAttempt] = useState(0)
  const mine = isShift(shift) ? creatorAddress(area, society, shift) : ""
  const { t } = useLanguage()
  const day = useIstDate()

  const load = useCallback(async () => {
    if (!isShift(shift)) return
    try {
      const next = await fetchSpread(area, society, shift)
      setRows(next)
      setMessage("")
      setStatus("ready")
    } catch (error) {
      setMessage(explainFailure(error, t).text)
      setStatus("error")
    }
  }, [area, society, shift, t, day])

  useEffect(() => {
    setStatus("loading")
    setLive("on")
    void load()
    return watchReadings(
      () => {
        void load()
      },
      () => setLive("off"),
    )
  }, [load, attempt])

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

  return (
    <SocietyScreen>
      <SocietyHeader area={area} society={society} shift={shift} />
      {live === "off" && status !== "loading" ? (
        <div className="callout">
          {t.liveStopped}{" "}
          <button type="button" className="quiet" onClick={() => setAttempt((value) => value + 1)}>
            {t.tryAgain}
          </button>
        </div>
      ) : null}
      {status === "loading" ? (
        <p className="panel panel-quiet" aria-busy="true">
          {t.readingBoard}
        </p>
      ) : null}
      {status === "error" ? (
        <div className="panel panel-alert">
          <p>
            {t.boardFailed} {message}
          </p>
          <button type="button" onClick={() => void load()}>
            {t.tryAgain}
          </button>
        </div>
      ) : null}
      {status === "ready" && rows.length === 0 ? (
        <div className="panel panel-empty">
          <p>{t.emptyBoard}</p>
          <div className="form-actions">
            <Link className="landing-solid" to={filePath(area, society, shift)}>
              {t.fileGlass}
            </Link>
            <Link className="landing-ghost" to={slipPath(area, society, shift)}>
              {t.compareSlip}
            </Link>
          </div>
        </div>
      ) : null}
      {status === "ready" && rows.length > 0 ? (
        <>
          <div className="stats">
            <div className="stat">
              <span className="stat-label">{t.statWallets}</span>
              <strong>{rows.length}</strong>
            </div>
            <div className="stat">
              <span className="stat-label">{t.statSpread}</span>
              <strong>{spreadText(rows)}</strong>
            </div>
          </div>
          <p className="stats-note">{t.notSaved}</p>
          {rows.length === 1 ? <p className="callout">{t.oneWitness}</p> : null}
          {!rows.some((row) => isThisPhone(row.creator, mine)) ? (
            <p className="callout">
              {t.notFiled} <Link to={filePath(area, society, shift)}>{t.fileGlass}</Link>
            </p>
          ) : null}
          <ul className="board-list">
            {byFat(rows).map((row) => (
              <li key={row.creator}>
                <span className="reading-value">
                  <small>{t.fat}</small>
                  <strong>{row.fat}</strong>
                </span>
                <span className="reading-value">
                  <small>{t.snf}</small>
                  <strong>{row.snf}</strong>
                </span>
                {isThisPhone(row.creator, mine) ? <em>{t.thisPhone}</em> : null}
              </li>
            ))}
          </ul>
          <div className="form-actions">
            <Link className="landing-solid" to={slipPath(area, society, shift)}>
              {t.compareSlip}
            </Link>
          </div>
        </>
      ) : null}
    </SocietyScreen>
  )
}
