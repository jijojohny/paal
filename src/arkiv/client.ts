import { createPublicClient, createWalletClient } from "@arkiv-network/sdk"
import { tiramisu } from "@arkiv-network/sdk/chains"
import { http, webSocket, type Account } from "viem"
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts"

const WALLET_KEY = "paal.walletKey"

export const publicClient = createPublicClient({
  chain: tiramisu,
  transport: http(),
})

export function openWatchClient() {
  return createPublicClient({
    chain: tiramisu,
    transport: webSocket(),
  })
}

export function loadAccount(): Account {
  const existing = localStorage.getItem(WALLET_KEY)
  const privateKey = existing ?? generatePrivateKey()
  if (!existing) localStorage.setItem(WALLET_KEY, privateKey)
  return privateKeyToAccount(privateKey as `0x${string}`)
}

export function walletClientFor(account: Account) {
  return createWalletClient({
    account,
    chain: tiramisu,
    transport: http(),
  })
}

export const FAUCET_URL = "https://hub.arkiv.network/faucet"
