import { Link } from "react-router-dom"
import { useLanguage } from "../i18n/language"
import { SiteHeader } from "./SiteHeader"

export function AboutSlip() {
  const { t } = useLanguage()
  return (
    <div className="landing">
      <SiteHeader />
      <article className="landing-page">
        <h1>{t.slip}</h1>
        <p>{t.slipP1}</p>
        <p>{t.slipP2}</p>
        <Link className="landing-solid" to="/open">
          {t.openSociety}
        </Link>
      </article>
    </div>
  )
}
