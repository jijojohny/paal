import { useState } from "react"
import { FAUCET_URL } from "../arkiv/client"
import { creatorAddress } from "../arkiv/write"

export function Wallet() {
  const [address] = useState(() => creatorAddress())
  return (
    <section>
      <h1>This phone</h1>
      <p>One phone is one witness. This address is not written into the reading as a name.</p>
      <p className="address">{address}</p>
      <a href={FAUCET_URL}>Get test GLM</a>
    </section>
  )
}
