import { FormEvent, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { FAUCET_URL } from "../arkiv/client"
import { isShift, parseQuality } from "../arkiv/labels"
import { findMine, type OwnReading } from "../arkiv/readings"
import { creatorAddress, fileReading, removeOwnReading } from "../arkiv/write"
import { SocietyHeader } from "./SocietyHeader"

export function File() {
  const params = useParams()
  const area = params.area ?? ""
  const society = params.society ?? ""
  const shift = params.shift
  const [fat, setFat] = useState("")
  const [snf, setSnf] = useState("")
  const [mine, setMine] = useState<OwnReading | null>(null)
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")
  const [message, setMessage] = useState("")
  const [pending, setPending] = useState(false)

  useEffect(() => {
    if (!isShift(shift)) return
    let cancelled = false
    setStatus("loading")
    findMine(creatorAddress(), area, society, shift)
      .then((reading) => {
        if (cancelled) return
        setMine(reading)
        setStatus("ready")
      })
      .catch((cause: unknown) => {
        if (cancelled) return
        setMessage(cause instanceof Error ? cause.message : "The query failed.")
        setStatus("error")
      })
    return () => {
      cancelled = true
    }
  }, [area, society, shift])

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
    if (!isShift(shift) || mine) return
    const nextFat = parseQuality(fat, "fat")
    const nextSnf = parseQuality(snf, "snf")
    if (!nextFat || !nextSnf) {
      setMessage("Fat must be from 1 to 12. SNF must be from 6 to 12.")
      return
    }
    setPending(true)
    setMessage("")
    try {
      await fileReading(area, society, shift, nextFat, nextSnf)
      setMine(await findMine(creatorAddress(), area, society, shift))
    } catch (cause) {
      setMessage(cause instanceof Error ? cause.message : "The write failed.")
    } finally {
      setPending(false)
    }
  }

  async function onRemove() {
    if (!mine) return
    setPending(true)
    setMessage("")
    try {
      await removeOwnReading(mine.key)
      setMine(null)
    } catch (cause) {
      setMessage(cause instanceof Error ? cause.message : "The delete failed.")
    } finally {
      setPending(false)
    }
  }

  return (
    <section>
      <SocietyHeader area={area} society={society} shift={shift} />
      <h2>What the glass showed</h2>
      {status === "loading" ? <p aria-busy="true">Checking this phone…</p> : null}
      {status === "error" ? (
        <div className="error">
          <p>{message}</p>
          <a href={FAUCET_URL}>Get test GLM</a>
        </div>
      ) : null}
      {status === "ready" && mine ? (
        <div>
          <p>
            This phone already filed fat {mine.fat}, SNF {mine.snf}. A second reading is refused.
          </p>
          <button type="button" disabled={pending} onClick={() => void onRemove()}>
            Remove my reading
          </button>
        </div>
      ) : null}
      {status === "ready" && !mine ? (
        <form onSubmit={(event) => void onSubmit(event)}>
          <label>
            Fat
            <input
              name="fat"
              inputMode="decimal"
              autoComplete="off"
              value={fat}
              onChange={(event) => setFat(event.target.value)}
            />
          </label>
          <label>
            SNF
            <input
              name="snf"
              inputMode="decimal"
              autoComplete="off"
              value={snf}
              onChange={(event) => setSnf(event.target.value)}
            />
          </label>
          <button type="submit" disabled={pending}>
            {pending ? "Filing…" : "File reading"}
          </button>
          <p>
            <a href={FAUCET_URL}>Get test GLM</a> if the write cannot pay gas.
          </p>
        </form>
      ) : null}
      {message && status === "ready" ? <p className="error">{message}</p> : null}
    </section>
  )
}
