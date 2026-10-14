import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { App } from "./App"
import { LanguageProvider } from "./i18n/language"
import "./index.css"

const root = document.getElementById("root")
if (!root) throw new Error("Missing root")
createRoot(root).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
