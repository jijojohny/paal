import { useState } from "react"
import { FAUCET_URL } from "../arkiv/client"
import { creatorAddress } from "../arkiv/write"
import { SiteHeader } from "./SiteHeader"

export function Wallet() {
  const [address] = useState(() => creatorAddress())
  return (
    <div className="landing">
      <SiteHeader />
      <section className="landing-page">
        <h1>Wallet</h1>
        <p>One phone is one witness. This address is not written into the reading as a name.</p>
        <p className="address">{address}</p>
        <a className="landing-ghost" href={FAUCET_URL}>
          Get test GLM
        </a>
      </section>
    </div>
  )
}
