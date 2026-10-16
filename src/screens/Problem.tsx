import { Link } from "react-router-dom"
import { useLanguage } from "../i18n/language"
import { SiteHeader } from "./SiteHeader"

export function Problem() {
  const { t } = useLanguage()
  return (
    <div className="landing">
      <SiteHeader />
      <article className="landing-page reading-note">
        <h1>{t.problem}</h1>
        <p className="reading-lead">{t.problemLead}</p>
        <h2>{t.problemIssue}</h2>
        <p>{t.problemIssueBody}</p>
        <h2>{t.problemWrong}</h2>
        <ul>
          <li>{t.problemWrongPay}</li>
          <li>{t.problemWrongOne}</li>
          <li>{t.problemWrongBook}</li>
        </ul>
        <h2>{t.problemDoes}</h2>
        <ul>
          <li>{t.problemDoesGlass}</li>
          <li>{t.problemDoesSlip}</li>
          <li>{t.problemDoesArgue}</li>
          <li>{t.problemDoesMidnight}</li>
          <li>{t.problemDoesOwn}</li>
        </ul>
        <h2>{t.problemLimit}</h2>
        <p>{t.problemLimitBody}</p>
        <Link className="landing-solid" to="/open">
          {t.openSociety}
        </Link>
      </article>
    </div>
  )
}
