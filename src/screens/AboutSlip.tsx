import { Link } from "react-router-dom"
import { copy } from "../i18n/copy"
import { useLanguage } from "../i18n/language"
import { SiteHeader } from "./SiteHeader"

export function AboutSlip() {
  const { lang, t } = useLanguage()
  return (
    <div className="landing">
      <SiteHeader />
      <article className="landing-page reading-note">
        <h1>{t.slip}</h1>
        <p className="reading-lead">{t.slipLead}</p>
        <h2>{t.slipTypes}</h2>
        <p>{t.slipTypesBody}</p>
        <h2>{t.slipGoes}</h2>
        <p>{t.slipGoesBody}</p>
        <h2>{t.slipShows}</h2>
        <ul>
          <li>{t.slipShowsAbove}</li>
          <li>{t.slipShowsSame}</li>
          <li>{t.slipShowsGap}</li>
        </ul>
        <h2>{t.slipArgue}</h2>
        <p>{t.slipArgueBody}</p>
        <p className="argue">
          {t.argue}
          {lang === "ta" ? <span lang="en">{copy.en.argue}</span> : <span lang="ta">{copy.ta.argue}</span>}
        </p>
        <h2>{t.slipBlind}</h2>
        <p>{t.slipBlindBody}</p>
        <Link className="landing-solid" to="/open">
          {t.openSociety}
        </Link>
      </article>
    </div>
  )
}
