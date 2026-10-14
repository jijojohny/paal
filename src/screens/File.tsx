import { FormEvent, useEffect, useRef, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { FAUCET_URL } from "../arkiv/client"
import { isShift, parseQuality } from "../arkiv/labels"
import { findMine, type OwnReading } from "../arkiv/readings"
import { AlreadyFiled, creatorAddress, fileReading, removeOwnReading } from "../arkiv/write"
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
    if (!isShift(shift) || mine) return
    const nextFat = parseQuality(fat, "fat")
    const nextSnf = parseQuality(snf, "snf")
    if (!nextFat) {
      setInvalid("fat")
      setMessage("Enter the fat on the glass, from 1 to 12.")
      fatRef.current?.focus()
      return
    }
    if (!nextSnf) {
      setInvalid("snf")
      setMessage("Enter the SNF on the glass, from 6 to 12.")
      snfRef.current?.focus()
      return
    }
    setPending(true)
    setInvalid(null)
    setMessage("")
    try {
      setMine(await fileReading(area, society, shift, nextFat, nextSnf))
    } catch (cause) {
      if (cause instanceof AlreadyFiled) {
        setMine(cause.existing)
        return
      }
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
      setFat("")
      setSnf("")
    } catch (cause) {
      setMessage(cause instanceof Error ? cause.message : "The delete failed.")
    } finally {
      setPending(false)
    }
  }

  const needsFaucet = message.toLowerCase().includes("glm")

  return (
    <SocietyScreen>
      <SocietyHeader area={area} society={society} shift={shift} />
      <h2>What the glass showed</h2>
      <p>One phone files one fat and one SNF for this shift. A second filing is refused.</p>
      {status === "loading" ? <p aria-busy="true">Checking this phone…</p> : null}
      {status === "error" ? (
        <div>
          <p className="error">{message}</p>
          <button
            className="quiet"
            type="button"
            onClick={() => {
              setStatus("loading")
              if (!isShift(shift)) return
              findMine(creatorAddress(), area, society, shift)
                .then((reading) => {
                  setMine(reading)
                  setMessage("")
                  setStatus("ready")
                })
                .catch((cause: unknown) => {
                  setMessage(cause instanceof Error ? cause.message : "The query failed.")
                  setStatus("error")
                })
            }}
          >
            Try again
          </button>
        </div>
      ) : null}
      {status === "ready" && mine ? (
        <div className="filed">
          <p>
            This phone already filed fat {mine.fat}, SNF {mine.snf}. A second reading is refused.
          </p>
          <div className="form-actions">
            <button className="quiet" type="button" disabled={pending} onClick={() => void onRemove()}>
              {pending ? "Removing…" : "Remove my reading"}
            </button>
            <Link className="landing-solid" to={todayPath(area, society, shift)}>
              See the board
            </Link>
          </div>
        </div>
      ) : null}
      {status === "ready" && !mine ? (
        <form className="open-form" onSubmit={(event) => void onSubmit(event)} noValidate>
          <label htmlFor="fat">
            Fat
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
            {invalid === "fat" ? message : "Required. From 1 to 12."}
          </p>
          <label htmlFor="snf">
            SNF
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
            {invalid === "snf" ? message : "Required. From 6 to 12."}
          </p>
          <div className="form-actions">
            <button type="submit" disabled={pending} aria-busy={pending}>
              {pending ? "Filing…" : "File reading"}
            </button>
            <a className="landing-ghost" href={FAUCET_URL}>
              Get test GLM
            </a>
          </div>
        </form>
      ) : null}
      {message && status === "ready" && !invalid ? (
        <p className="error">
          {message}{" "}
          {needsFaucet ? (
            <a href={FAUCET_URL}>Get test GLM</a>
          ) : null}
        </p>
      ) : null}
    </SocietyScreen>
  )
}
