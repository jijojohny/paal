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

/** The same screen, on the other shift. Today stays today. Slip stays slip. File stays file. */
export function sameScreenPath(area: string, society: string, shift: Shift, pathname: string): string {
  if (pathname.endsWith("/file")) return filePath(area, society, shift)
  if (pathname.endsWith("/slip")) return slipPath(area, society, shift)
  return todayPath(area, society, shift)
}
