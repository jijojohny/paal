import { Link } from "react-router-dom"
import { useLanguage } from "../i18n/language"
import { SiteHeader } from "./SiteHeader"

export function Reading() {
  const { t } = useLanguage()
  return (
    <div className="landing">
      <SiteHeader />
      <article className="landing-page reading-note">
        <h1>{t.reading}</h1>
        <p className="reading-lead">{t.readingLead}</p>
        <h2>{t.readingHolds}</h2>
        <ul>
          <li>{t.readingFatLine}</li>
          <li>{t.readingSnfLine}</li>
          <li>{t.readingPlaceLine}</li>
        </ul>
        <h2>{t.readingLeaves}</h2>
        <p>{t.readingLeavesBody}</p>
        <h2>{t.readingOnce}</h2>
        <p>{t.readingOnceBody}</p>
        <h2>{t.readingMidnight}</h2>
        <p>{t.readingMidnightBody}</p>
        <Link className="landing-solid" to="/open">
          {t.openSociety}
        </Link>
      </article>
    </div>
  )
}
