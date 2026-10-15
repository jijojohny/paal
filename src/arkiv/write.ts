import { ExpirationTime } from "@arkiv-network/sdk"
import { dec, str } from "@arkiv-network/sdk/attr"
import { formatEther, type Account, type Hex } from "viem"
import { publicClient, walletClientFor, witnessAccount } from "./client"
import { nextIstMidnight } from "./expiry"
import { parseQuality, type Shift } from "./labels"
import { findMine, type OwnReading } from "./readings"

export class AlreadyFiled extends Error {
  readonly existing: OwnReading

  constructor(existing: OwnReading) {
    super("This phone already filed a reading for this shift.")
    this.name = "AlreadyFiled"
    this.existing = existing
  }
}

export async function fileReading(
  area: string,
  society: string,
  shift: Shift,
  fat: string,
  snf: string,
): Promise<OwnReading> {
  return fileReadingFor(witnessAccount(area, society, shift), area, society, shift, fat, snf)
}

export async function fileReadingFor(
  account: Account,
  area: string,
  society: string,
  shift: Shift,
  fat: string,
  snf: string,
): Promise<OwnReading> {
  const nextFat = parseQuality(fat, "fat")
  const nextSnf = parseQuality(snf, "snf")
  if (!nextFat || !nextSnf) {
    throw new Error("Fat must be from 1 to 12. SNF must be from 6 to 12.")
  }
  const existing = await findMine(account.address, area, society, shift)
  if (existing) throw new AlreadyFiled(existing)

  const balance = await publicClient.getBalance({ address: account.address })
  if (balance === 0n) {
    throw new Error("This phone has no test GLM. Get some from the faucet, then file again.")
  }

  const wallet = walletClientFor(account)
  const { entityKey, txHash } = await wallet.createEntity({
    payload: new Uint8Array(),
    contentType: "application/octet-stream",
    attributes: {
      app: str("paal"),
      area: str(area),
      society: str(society),
      shift: str(shift),
      fat: dec(nextFat),
      snf: dec(nextSnf),
    },
    expires: ExpirationTime.atDate(nextIstMidnight()),
    flags: { readonly: true },
  })
  await wallet.waitForTransactionReceipt({ hash: txHash })
  return { key: entityKey, fat: nextFat, snf: nextSnf }
}

export async function removeOwnReading(
  area: string,
  society: string,
  shift: Shift,
  entityKey: Hex,
): Promise<void> {
  const wallet = walletClientFor(witnessAccount(area, society, shift))
  const { txHash } = await wallet.deleteEntity({ entityKey })
  await wallet.waitForTransactionReceipt({ hash: txHash })
}

export function creatorAddress(area: string, society: string, shift: Shift): Hex {
  return witnessAccount(area, society, shift).address
}

export function witnessBalance(area: string, society: string, shift: Shift): Promise<bigint> {
  return publicClient.getBalance({ address: creatorAddress(area, society, shift) })
}

/** GLM uses 18 decimals. A zero balance stays `0`; dust keeps its full fraction. */
export function formatGlm(balance: bigint): string {
  if (balance === 0n) return "0"
  const [whole, fraction = ""] = formatEther(balance).split(".")
  const shown = fraction.slice(0, 4).replace(/0+$/, "")
  if (shown) return `${whole}.${shown}`
  if (fraction.length > 4 && whole === "0") return `0.${fraction.replace(/0+$/, "")}`
  return whole
}
