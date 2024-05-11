import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Auth from "./Screens/Auth"
import CreateContent from "./Screens/CreateContent"
import AuthorDashboard from "./Screens/AuthorDashboard"
import Dashboard from "./Screens/Dashboard"
const App = () => {
  return (
    <Router>
      {/* <div> */}
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/AuthDashBoard" element={<AuthorDashboard />} />
        <Route path="/UploadContent" element={<CreateContent />} />
      </Routes>
      {/* </div> */}
    </Router>
  )
}

export default App
