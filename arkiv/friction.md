# Friction

SDK `@arkiv-network/sdk` 0.8.1. Public HTTP `https://rpc.tiramisu.db-chain.testnet.arkiv.network`. Chain id 7738577.

## A wallet with no GLM

Expected: `createEntity` for a reading is rejected with an insufficient-funds error.

Actual: `EntityMutationError: Transaction failed: Execution error without revert data`. `getBalance` for that address was `0`.

Steps: generate a fresh key, call `fileReadingFor` with area `madurai`, society `structure check`, shift `morning`, fat `3.5`, SNF `8.5`, and an empty payload.

The app now checks the balance first and tells the pourer to use the faucet, so this raw error is not what the screen shows for an empty wallet.

## Anonymous query budget

Expected: `arkiv_query` on the public HTTP endpoint returns the matching readings.

Actual: HTTP 429, body `ANON_COST_LIMITED`, message `unauthenticated query budget exhausted`. Headers included `ratelimit: limit=10000, remaining=0` and `retry-after`. `eth_chainId` on the same host still returned `0x7614d1`. The SDK waited on that 429, so the board stayed on “Reading the board…”.

Steps: POST `arkiv_query` for `app = "paal"` to `https://rpc.tiramisu.db-chain.testnet.arkiv.network` with no access key. Observed 15 Oct 2026.

An access key on that URL returns HTTP 200 and the query completes. The key stays in `.env` and is not in the repo. A query that still fails is shown on the screen, and the client no longer retries the 429.

## Access key quota

Expected: a fresh access key covers a hackathon demo for the month.

Actual: one day later the key returned HTTP 429, body `{"error":"QUOTA_EXCEEDED","message":"quota exhausted"}`. The same query without the key returned 200 with `ratelimit: limit=600`. Observed 16 Oct 2026.

The client now tries the key first. If the key gets a 401, 403, or 429, the same call goes to the public endpoint. Live updates use the public socket.
