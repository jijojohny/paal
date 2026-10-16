import { createPublicClient, createWalletClient } from "@arkiv-network/sdk"
import { tiramisu } from "@arkiv-network/sdk/chains"
import { encodePacked, keccak256, type Account, type Hex } from "viem"
import { fallback, http, webSocket } from "viem"
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts"
import { istDate } from "./expiry"
import type { Shift } from "./labels"

const SEED_KEY = "paal.witnessSeed"
const OLD_WALLET_KEY = "paal.walletKey"
const TIRAMISU_HTTP = "https://rpc.tiramisu.db-chain.testnet.arkiv.network"
const TIRAMISU_WS = "wss://rpc.tiramisu.db-chain.testnet.arkiv.network"

function accessKey(): string {
  const fromVite = import.meta.env?.VITE_ARKIV_ACCESS_KEY
  if (typeof fromVite === "string" && fromVite.trim()) return fromVite.trim()
  const fromNode = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env
    ?.VITE_ARKIV_ACCESS_KEY
  return typeof fromNode === "string" ? fromNode.trim() : ""
}

function authed(url: string): string {
  const key = accessKey()
  return key ? `${url}/${encodeURIComponent(key)}` : url
}

const rpc = { timeout: 12_000, retryCount: 0 } as const

/** The key only adds quota. When the key is refused, the same call goes to the public endpoint. */
function keyRefused(error: unknown): boolean {
  let current: unknown = error
  for (let depth = 0; current && typeof current === "object" && depth < 6; depth++) {
    if ("status" in current && (current.status === 401 || current.status === 403 || current.status === 429)) {
      return true
    }
    current = "cause" in current ? current.cause : undefined
  }
  return false
}

function rpcTransport() {
  if (!accessKey()) return http(TIRAMISU_HTTP, rpc)
  return fallback([http(authed(TIRAMISU_HTTP), rpc), http(TIRAMISU_HTTP, rpc)], {
    retryCount: 0,
    shouldThrow: (error) => !keyRefused(error),
  })
}

export const publicClient = createPublicClient({
  chain: tiramisu,
  transport: rpcTransport(),
})

export function openWatchClient() {
  return createPublicClient({
    chain: tiramisu,
    transport: webSocket(TIRAMISU_WS, { timeout: 12_000, retryCount: 0 }),
  })
}

function witnessSeed(): Hex {
  const existing = localStorage.getItem(SEED_KEY)
  if (existing) return existing as Hex
  const migrated = localStorage.getItem(OLD_WALLET_KEY)
  const seed = migrated ?? generatePrivateKey()
  localStorage.setItem(SEED_KEY, seed)
  localStorage.removeItem(OLD_WALLET_KEY)
  return seed as Hex
}

/** A witness for one phone, one board, and one India date. Another board is another key. */
export function witnessFromSeed(seed: Hex, area: string, society: string, shift: Shift, now = new Date()): Account {
  const day = istDate(now)
  let scope = `${day}|${area}|${society}|${shift}`
  for (let attempt = 0; attempt < 5; attempt++) {
    const privateKey = keccak256(encodePacked(["bytes32", "string"], [seed, scope]))
    try {
      return privateKeyToAccount(privateKey)
    } catch {
      scope = `${day}|${area}|${society}|${shift}|${attempt}`
    }
  }
  throw new Error("Could not derive a witness.")
}

export function witnessAccount(area: string, society: string, shift: Shift, now = new Date()): Account {
  return witnessFromSeed(witnessSeed(), area, society, shift, now)
}

export function walletClientFor(account: Account) {
  return createWalletClient({
    account,
    chain: tiramisu,
    transport: rpcTransport(),
  })
}

export const FAUCET_URL = "https://hub.arkiv.network/faucet"
