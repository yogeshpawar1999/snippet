import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Auth from "./Screens/Auth"
import CreateContent from "./Screens/CreateContent"
import AuthorDashboard from "./Screens/AuthorDashboard"
import Dashboard from "./Screens/Dashboard"
import { C2paProvider } from "@contentauth/react"
import wasmSrc from "c2pa/dist/assets/wasm/toolkit_bg.wasm?url"
import workerSrc from "c2pa/dist/c2pa.worker.min.js?url"

const App = () => {
  return (
    <C2paProvider
      config={{
        wasmSrc,
        workerSrc,
      }}
    >
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/AuthDashBoard" element={<AuthorDashboard />} />
            <Route path="/UploadContent" element={<CreateContent />} />
          </Routes>
        </div>
      </Router>
    </C2paProvider>
  )
}

export default App
