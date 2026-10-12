# Friction

SDK `@arkiv-network/sdk` 0.8.1. Public HTTP `https://rpc.tiramisu.db-chain.testnet.arkiv.network`. Chain id 7738577.

## A wallet with no GLM

Expected: `createEntity` for a reading is rejected with an insufficient-funds error.

Actual: `EntityMutationError: Transaction failed: Execution error without revert data`. `getBalance` for that address was `0`.

Steps: generate a fresh key, call `fileReadingFor` with area `madurai`, society `structure check`, shift `morning`, fat `3.5`, SNF `8.5`, and an empty payload.

The app now checks the balance first and tells the pourer to use the faucet, so this raw error is not what the screen shows for an empty wallet.
