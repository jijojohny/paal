import { isShift } from "../src/arkiv/labels"
import { fetchSpread } from "../src/arkiv/readings"

declare const process: { argv: string[]; exitCode?: number }

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
