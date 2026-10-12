import { ExpirationTime } from "@arkiv-network/sdk"
import { dec, str } from "@arkiv-network/sdk/attr"
import type { Hex } from "viem"
import { loadAccount, walletClientFor } from "./client"
import { nextIstMidnight } from "./expiry"
import type { Shift } from "./labels"

export async function fileReading(
  area: string,
  society: string,
  shift: Shift,
  fat: string,
  snf: string,
): Promise<void> {
  const account = loadAccount()
  const wallet = walletClientFor(account)
  await wallet.createEntity({
    payload: new Uint8Array(),
    contentType: "application/octet-stream",
    attributes: {
      app: str("paal"),
      area: str(area),
      society: str(society),
      shift: str(shift),
      fat: dec(fat),
      snf: dec(snf),
    },
    expires: ExpirationTime.atDate(nextIstMidnight()),
    flags: { readonly: true },
  })
}

export async function removeOwnReading(entityKey: Hex): Promise<void> {
  const wallet = walletClientFor(loadAccount())
  await wallet.deleteEntity({ entityKey })
}

export function creatorAddress(): Hex {
  return loadAccount().address
}
