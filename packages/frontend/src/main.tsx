import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { C2paProvider } from "@contentauth/react"
import wasmSrc from "c2pa/dist/assets/wasm/toolkit_bg.wasm?url"
import workerSrc from "c2pa/dist/c2pa.worker.min.js?url"
import "bootstrap/dist/css/bootstrap.min.css"
import {AuthProvider} from "./Screens/AuthContext.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <C2paProvider
      config={{
        wasmSrc,
        workerSrc,
      }}
    >
    <AuthProvider>
      <App />
    </AuthProvider>
    </C2paProvider>
  </React.StrictMode>
)
