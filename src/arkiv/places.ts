import type { Place } from "./labels"

const STORAGE_KEY = "paal.places"
const MAX_PLACES = 8

export function listPlaces(): Place[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  try {
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.flatMap((item) => {
      if (!item || typeof item !== "object") return []
      const area = "area" in item && typeof item.area === "string" ? item.area : ""
      const society = "society" in item && typeof item.society === "string" ? item.society : ""
      if (!area || !society) return []
      return [{ area, society }]
    })
  } catch {
    return []
  }
}

/** Remembers the society name only. Fats and counts stay out of this list. */
export function rememberPlace(place: Place): void {
  const next = [
    place,
    ...listPlaces().filter((item) => item.area !== place.area || item.society !== place.society),
  ].slice(0, MAX_PLACES)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

/** Drops one saved name. Fats were never in this list. */
export function forgetPlace(place: Place): Place[] {
  const next = listPlaces().filter((item) => item.area !== place.area || item.society !== place.society)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  return next
}
