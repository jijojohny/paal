import { useState } from "react"
import { FAUCET_URL } from "../arkiv/client"
import { creatorAddress } from "../arkiv/write"
import { useLanguage } from "../i18n/language"
import { SiteHeader } from "./SiteHeader"

export function Wallet() {
  const { t } = useLanguage()
  const [address] = useState(() => creatorAddress())
  return (
    <div className="landing">
      <SiteHeader />
      <section className="landing-page">
        <h1>{t.wallet}</h1>
        <p>{t.walletBody}</p>
        <p className="address">{address}</p>
        <a className="landing-ghost" href={FAUCET_URL}>
          {t.getGlm}
        </a>
      </section>
    </div>
  )
}
