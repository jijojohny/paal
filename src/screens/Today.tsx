import { useCallback, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { creatorAddress } from "../arkiv/write"
import { isShift } from "../arkiv/labels"
import { fetchSpread, type SpreadRow } from "../arkiv/readings"
import { watchReadings } from "../arkiv/watch"
import { explainFailure } from "../i18n/copy"
import { useLanguage } from "../i18n/language"
import { filePath, slipPath } from "./paths"
import { SocietyHeader, SocietyScreen } from "./SocietyHeader"

type Status = "loading" | "ready" | "error"

export function Today() {
  const params = useParams()
  const area = params.area ?? ""
  const society = params.society ?? ""
  const shift = params.shift
  const [status, setStatus] = useState<Status>("loading")
  const [rows, setRows] = useState<SpreadRow[]>([])
  const [message, setMessage] = useState("")
  const mine = creatorAddress()
  const { t } = useLanguage()

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
  }, [area, society, shift, t])

  useEffect(() => {
    setStatus("loading")
    void load()
    return watchReadings(() => {
      void load()
    })
  }, [load])

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
      {status === "loading" ? <p aria-busy="true">{t.readingBoard}</p> : null}
      {status === "error" ? (
        <div className="error">
          <p>
            {t.boardFailed} {message}
          </p>
          <button type="button" onClick={() => void load()}>
            {t.tryAgain}
          </button>
        </div>
      ) : null}
      {status === "ready" && rows.length === 0 ? (
        <div className="board-empty">
          <p>{t.emptyBoard}</p>
          <Link className="landing-solid" to={filePath(area, society, shift)}>
            {t.fileGlass}
          </Link>
        </div>
      ) : null}
      {status === "ready" && rows.length > 0 ? (
        <>
          <p className="board-count">{t.walletCount(rows.length)}</p>
          <ul className="board-list">
            {rows.map((row) => (
              <li key={row.creator}>
                <span>
                  {t.fat} {row.fat}
                </span>
                <span>
                  {t.snf} {row.snf}
                </span>
                {row.creator.toLowerCase() === mine.toLowerCase() ? <em>{t.thisPhone}</em> : null}
              </li>
            ))}
          </ul>
          <Link className="landing-ghost" to={slipPath(area, society, shift)}>
            {t.compareSlip}
          </Link>
        </>
      ) : null}
    </SocietyScreen>
  )
}
