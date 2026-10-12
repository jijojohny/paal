import type { Shift } from "../arkiv/labels"

export function todayPath(area: string, society: string, shift: Shift): string {
  return `/s/${encodeURIComponent(area)}/${encodeURIComponent(society)}/${shift}`
}

export function slipPath(area: string, society: string, shift: Shift): string {
  return `${todayPath(area, society, shift)}/slip`
}

export function filePath(area: string, society: string, shift: Shift): string {
  return `${todayPath(area, society, shift)}/file`
}
