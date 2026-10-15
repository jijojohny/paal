import { Link } from "react-router-dom"
import { useLanguage } from "../i18n/language"
import { SiteHeader } from "./SiteHeader"

export function Wallet() {
  const { t } = useLanguage()
  return (
    <div className="landing">
      <SiteHeader />
      <section className="landing-page">
        <h1>{t.wallet}</h1>
        <p>{t.walletBody}</p>
        <Link className="landing-solid" to="/open">
          {t.openSociety}
        </Link>
      </section>
    </div>
  )
}
