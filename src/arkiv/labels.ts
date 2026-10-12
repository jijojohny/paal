export type Shift = "morning" | "evening"

export type Place = {
  area: string
  society: string
}

export type SocietyShift = Place & {
  shift: Shift
}

export function isShift(value: string | undefined): value is Shift {
  return value === "morning" || value === "evening"
}

export function normalizeLabel(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ")
}

export function isDigitsOnly(value: string): boolean {
  return /^\d+$/.test(value)
}

const FAT_MIN = 1
const FAT_MAX = 12
const SNF_MIN = 6
const SNF_MAX = 12

export function parseQuality(value: string, kind: "fat" | "snf"): string | null {
  const trimmed = value.trim()
  if (!/^\d+(\.\d+)?$/.test(trimmed)) return null
  const number = Number(trimmed)
  const min = kind === "fat" ? FAT_MIN : SNF_MIN
  const max = kind === "fat" ? FAT_MAX : SNF_MAX
  if (number < min || number > max) return null
  return trimmed
}

export function isHigherFat(readingFat: string, slipFat: string): boolean {
  return Number(readingFat) > Number(slipFat)
}
