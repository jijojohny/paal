import type { Shift } from "./labels"

const IST = "Asia/Kolkata"

export function defaultShift(now = new Date()): Shift {
  const hour = Number(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: IST,
      hour: "numeric",
      hourCycle: "h23",
    }).format(now),
  )
  return hour < 14 ? "morning" : "evening"
}

/** The next local midnight in India. `atDate` may round this up by one block. */
export function nextIstMidnight(now = new Date()): Date {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: IST,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now)
  const startOfToday = new Date(`${parts}T00:00:00+05:30`)
  return new Date(startOfToday.getTime() + 24 * 60 * 60 * 1000)
}
