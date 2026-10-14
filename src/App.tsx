import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AboutSlip } from "./screens/AboutSlip"
import { File } from "./screens/File"
import { Landing } from "./screens/Landing"
import { Layout } from "./screens/Layout"
import { Open } from "./screens/Open"
import { Reading } from "./screens/Reading"
import { Slip } from "./screens/Slip"
import { Today } from "./screens/Today"
import { Wallet } from "./screens/Wallet"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="reading" element={<Reading />} />
        <Route path="slip" element={<AboutSlip />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="open" element={<Open />} />
        <Route element={<Layout />}>
          <Route path="s/:area/:society/:shift" element={<Today />} />
          <Route path="s/:area/:society/:shift/slip" element={<Slip />} />
          <Route path="s/:area/:society/:shift/file" element={<File />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
