import { str } from "@arkiv-network/sdk/attr"
import { eq } from "@arkiv-network/sdk/query"
import type { Hex } from "viem"
import { publicClient } from "./client"
import type { Shift } from "./labels"

export type SpreadRow = {
  creator: Hex
  fat: string
  snf: string
  expiresAt: bigint
}

export type OwnReading = {
  key: Hex
  fat: string
  snf: string
}

function readDec(value: unknown): string | null {
  if (!value || typeof value !== "object" || !("value" in value)) return null
  const raw = value.value
  if (typeof raw === "string" || typeof raw === "number") return String(raw)
  return null
}

function readingQuery(area: string, society: string, shift: Shift) {
  return publicClient
    .select({ key: true, creator: true, attributes: true, expiresAt: true })
    .where(
      eq("app", str("paal")),
      eq("area", str(area)),
      eq("society", str(society)),
      eq("shift", str(shift)),
    )
    .limit(100)
}

/** One row per creator. The first live reading from a wallet is the one that counts. */
export async function fetchSpread(area: string, society: string, shift: Shift): Promise<SpreadRow[]> {
  const byCreator = new Map<string, SpreadRow>()
  for await (const entity of readingQuery(area, society, shift)) {
    const creator = entity.creator
    const expiresAt = entity.expiresAt
    if (!creator || expiresAt == null || byCreator.has(creator)) continue
    const fat = readDec(entity.attributes?.fat)
    const snf = readDec(entity.attributes?.snf)
    if (fat == null || snf == null) continue
    byCreator.set(creator, { creator, fat, snf, expiresAt })
  }
  return [...byCreator.values()]
}

export async function findMine(
  creator: Hex,
  area: string,
  society: string,
  shift: Shift,
): Promise<OwnReading | null> {
  const page = await publicClient
    .select({ key: true, attributes: true })
    .createdBy(creator)
    .where(
      eq("app", str("paal")),
      eq("area", str(area)),
      eq("society", str(society)),
      eq("shift", str(shift)),
    )
    .limit(1)
    .fetch()
  const entity = page.entities[0]
  if (!entity) return null
  const fat = readDec(entity.attributes?.fat)
  const snf = readDec(entity.attributes?.snf)
  if (fat == null || snf == null) return null
  return { key: entity.key, fat, snf }
}
