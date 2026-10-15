import { useState } from "react"
import { FAUCET_URL } from "../arkiv/client"
import { creatorAddress } from "../arkiv/write"
import { useLanguage } from "../i18n/language"
import { SiteHeader } from "./SiteHeader"

export function Wallet() {
  const { t } = useLanguage()
  const [address] = useState(() => creatorAddress())
  const [notice, setNotice] = useState<"copied" | "failed" | "">("")

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(address)
      setNotice("copied")
    } catch {
      setNotice("failed")
    }
  }

  return (
    <div className="landing">
      <SiteHeader />
      <section className="landing-page">
        <h1>{t.wallet}</h1>
        <p>{t.walletBody}</p>
        <p className="address">{address}</p>
        <div className="form-actions">
          <button type="button" className="quiet" onClick={() => void copyAddress()}>
            {t.copyAddress}
          </button>
          <a className="landing-ghost" href={FAUCET_URL}>
            {t.getGlm}
          </a>
        </div>
        {notice === "copied" ? <p aria-live="polite">{t.addressCopied}</p> : null}
        {notice === "failed" ? (
          <p className="error" aria-live="polite">
            {t.addressCopyFailed}
          </p>
        ) : null}
      </section>
    </div>
  )
}
