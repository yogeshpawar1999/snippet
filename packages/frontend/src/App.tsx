import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Auth from "./Screens/Auth"
import CreateContent from "./Screens/CreateContent"
import AuthorDashboard from "./Screens/AuthorDashboard"
import Dashboard from "./Screens/Dashboard"
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth-dashboard" element={<AuthorDashboard />} />
        <Route path="/upload-content" element={<CreateContent />} />
      </Routes>
    </Router>
  )
}

export default App
