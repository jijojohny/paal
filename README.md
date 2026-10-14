# Paal

A static site for a pourer at a village milk society. The phone shows the fat and SNF other wallets saw on the analyser. The fat printed on the paper slip stays on the slip screen and is never stored.

There is no backend. The browser and the reader both query Arkiv's public Tiramisu endpoint.

## Run

```bash
npm install
npm run dev
```

Read the same board without the site:

```bash
npm run reader -- madurai "aavin society" morning
```

The reader prints fats and SNFs. It cannot see a slip.

Test GLM: https://hub.arkiv.network/faucet

## Screens

- `/` landing
- `/reading` how a reading works
- `/slip` the paper slip, never stored
- `/wallet` this phone's address
- `/open` open a society
- `/s/:area/:society/:shift` today's readings
- `/s/:area/:society/:shift/slip` the paper slip
- `/s/:area/:society/:shift/file` what the glass showed

The data contract is in [arkiv/schema.md](arkiv/schema.md).
