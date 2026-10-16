import { useCallback, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { creatorAddress } from "../arkiv/write"
import { isShift, otherShift } from "../arkiv/labels"
import { fetchSpread, type SpreadRow } from "../arkiv/readings"
import { watchReadings } from "../arkiv/watch"
import { explainFailure } from "../i18n/copy"
import { useLanguage } from "../i18n/language"
import { SocietyHeader, SocietyScreen } from "./SocietyHeader"
import { filePath, slipPath, todayPath } from "./paths"
import { useIstDate } from "./useIstDate"

function byFat(rows: SpreadRow[]): SpreadRow[] {
  return [...rows].sort((a, b) => Number(b.fat) - Number(a.fat) || Number(b.snf) - Number(a.snf))
}

function rangeText(rows: SpreadRow[], pick: (row: SpreadRow) => string): string {
  let low = rows[0]
  let high = rows[0]
  for (const row of rows) {
    if (Number(pick(row)) < Number(pick(low))) low = row
    if (Number(pick(row)) > Number(pick(high))) high = row
  }
  const lowText = pick(low)
  const highText = pick(high)
  return Number(lowText) === Number(highText) ? lowText : `${lowText}–${highText}`
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
  const [otherRows, setOtherRows] = useState<SpreadRow[]>([])
  const [otherStatus, setOtherStatus] = useState<Status>("loading")
  const [otherMessage, setOtherMessage] = useState("")
  const mine = isShift(shift) ? creatorAddress(area, society, shift) : ""
  const paired = isShift(shift) ? otherShift(shift) : null
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

  useEffect(() => {
    if (!paired) return
    let cancelled = false
    setOtherStatus("loading")
    fetchSpread(area, society, paired)
      .then((next) => {
        if (cancelled) return
        setOtherRows(next)
        setOtherMessage("")
        setOtherStatus("ready")
      })
      .catch((error: unknown) => {
        if (cancelled) return
        setOtherMessage(explainFailure(error, t).text)
        setOtherStatus("error")
      })
    return () => {
      cancelled = true
    }
  }, [area, society, paired, t, day, attempt])

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
      {paired && otherStatus === "error" ? (
        <div className="callout">
          {t.otherShiftFailed(paired === "morning" ? t.morning : t.evening)} {otherMessage}{" "}
          <button type="button" className="quiet" onClick={() => setAttempt((value) => value + 1)}>
            {t.tryAgain}
          </button>
        </div>
      ) : null}
      {paired && otherStatus === "ready" && otherRows.length > 0 ? (
        <p className="callout">
          {t.otherShiftHas(paired === "morning" ? t.morning : t.evening, otherRows.length)}{" "}
          <Link to={todayPath(area, society, paired)}>{t.openShift(paired === "morning" ? t.morning : t.evening)}</Link>
        </p>
      ) : null}
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
              <strong>{rangeText(rows, (row) => row.fat)}</strong>
            </div>
            <div className="stat">
              <span className="stat-label">{t.statSnf}</span>
              <strong>{rangeText(rows, (row) => row.snf)}</strong>
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
