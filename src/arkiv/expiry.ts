import type { Shift } from "./labels"

const IST = "Asia/Kolkata"

/** Calendar date in India, `YYYY-MM-DD`. The witness changes when this changes. */
export function istDate(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: IST,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now)
}

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

/** Whole minutes until the next midnight in India. Zero once that midnight has passed. */
export function minutesUntilMidnight(now = new Date()): number {
  const left = nextIstMidnight(now).getTime() - now.getTime()
  return Math.max(0, Math.floor(left / 60_000))
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
