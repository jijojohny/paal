import { readFileSync } from "node:fs"
import { isShift } from "../src/arkiv/labels"

declare const process: {
  argv: string[]
  env: Record<string, string | undefined>
  exitCode?: number
}

function loadAccessKey(): void {
  if (process.env.VITE_ARKIV_ACCESS_KEY?.trim()) return
  try {
    const text = [".env.local", ".env"]
      .map((name) => {
        try {
          return readFileSync(new URL(`../${name}`, import.meta.url), "utf8")
        } catch {
          return ""
        }
      })
      .join("\n")
    for (const line of text.split("\n")) {
      const trimmed = line.trim()
      if (!trimmed.startsWith("VITE_ARKIV_ACCESS_KEY=")) continue
      const value = trimmed.slice("VITE_ARKIV_ACCESS_KEY=".length).trim().replace(/^["']|["']$/g, "")
      if (value) process.env.VITE_ARKIV_ACCESS_KEY = value
    }
  } catch {
    // A missing file keeps the public quota.
  }
}

loadAccessKey()
const { fetchSpread } = await import("../src/arkiv/readings")

const [area, society, shift] = process.argv.slice(2)

if (!area || !society || !isShift(shift)) {
  console.error("Usage: npm run reader -- <area> <society> <morning|evening>")
  process.exitCode = 1
} else {
  const rows = await fetchSpread(area, society, shift)
  console.log(`${rows.length} wallet${rows.length === 1 ? "" : "s"}`)
  for (const row of rows) {
    console.log(`${row.fat} fat, ${row.snf} SNF, ${row.creator}`)
  }
}
