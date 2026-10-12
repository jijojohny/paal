import { BrowserRouter, Route, Routes } from "react-router-dom"
import { File } from "./screens/File"
import { Layout } from "./screens/Layout"
import { Open } from "./screens/Open"
import { Slip } from "./screens/Slip"
import { Today } from "./screens/Today"
import { Wallet } from "./screens/Wallet"

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Open />} />
          <Route path="s/:area/:society/:shift" element={<Today />} />
          <Route path="s/:area/:society/:shift/slip" element={<Slip />} />
          <Route path="s/:area/:society/:shift/file" element={<File />} />
          <Route path="wallet" element={<Wallet />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
