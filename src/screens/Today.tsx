import { useCallback, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { creatorAddress } from "../arkiv/write"
import { isShift } from "../arkiv/labels"
import { fetchSpread, type SpreadRow } from "../arkiv/readings"
import { watchReadings } from "../arkiv/watch"
import { filePath } from "./paths"
import { SocietyHeader } from "./SocietyHeader"

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

  const load = useCallback(async () => {
    if (!isShift(shift)) return
    setStatus("loading")
    try {
      const next = await fetchSpread(area, society, shift)
      setRows(next)
      setStatus("ready")
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "The query failed.")
      setStatus("error")
    }
  }, [area, society, shift])

  useEffect(() => {
    void load()
    return watchReadings(() => {
      void load()
    })
  }, [load])

  if (!isShift(shift)) {
    return (
      <section>
        <h1>Unknown shift</h1>
        <Link to="/">Open a society</Link>
      </section>
    )
  }

  return (
    <section>
      <SocietyHeader area={area} society={society} shift={shift} />
      {status === "loading" ? <p aria-busy="true">Reading the board…</p> : null}
      {status === "error" ? (
        <div className="error">
          <p>The board did not load. {message}</p>
          <button type="button" onClick={() => void load()}>
            Try again
          </button>
        </div>
      ) : null}
      {status === "ready" && rows.length === 0 ? (
        <div>
          <p>No readings for this shift yet.</p>
          <Link to={filePath(area, society, shift)}>File what the glass showed</Link>
        </div>
      ) : null}
      {status === "ready" && rows.length > 0 ? (
        <>
          <p className="figure">
            <strong>{rows.length}</strong> {rows.length === 1 ? "wallet" : "wallets"} filed
          </p>
          <ul className="rows">
            {rows.map((row) => (
              <li key={row.creator}>
                <span>Fat {row.fat}</span>
                <span>SNF {row.snf}</span>
                {row.creator.toLowerCase() === mine.toLowerCase() ? <em>This phone</em> : null}
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </section>
  )
}
