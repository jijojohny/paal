# Paal schema

One entity type, `reading`. The payload is empty (`application/octet-stream`). `readonly` is true. There is no permissionless extension.

Attributes:

| Name | Type | Values |
| --- | --- | --- |
| app | string | `paal` |
| area | string | district or union, trimmed and lowercased |
| society | string | name on the building, trimmed and lowercased |
| shift | string | `morning` or `evening` |
| fat | decimal | 1 to 12 |
| snf | decimal | 6 to 12 |

A reading expires at the next midnight in `Asia/Kolkata`, via `ExpirationTime.atDate`, with no minimum-life floor. `atDate` rounds up to the next block, so a reading can outlive midnight by about two seconds. A reading filed at 23:50 lives only a few minutes.

The slip fat, farmer code, name, phone, litres, rate chart, and rupee amount are not stored.

## Query

The site and `reader/readings.ts` both run:

```ts
publicClient
  .select({ key: true, creator: true, attributes: true, expiresAt: true })
  .where(
    eq("app", str("paal")),
    eq("area", str(area)),
    eq("society", str(society)),
    eq("shift", str(shift)),
  )
  .limit(100)
```

The result keeps one row per `$creator`. `createdBy(thisWallet)` is the check that stops a second reading from the same phone.
