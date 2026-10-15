import { useEffect, useState } from "react"
import { istDate } from "../arkiv/expiry"

/** The India date. It changes after midnight so an open board can start the new day. */
export function useIstDate(): string {
  const [day, setDay] = useState(() => istDate())
  useEffect(() => {
    const id = window.setInterval(() => {
      const next = istDate()
      setDay((current) => (current === next ? current : next))
    }, 30_000)
    return () => window.clearInterval(id)
  }, [])
  return day
}
