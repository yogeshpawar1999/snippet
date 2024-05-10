
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./Screens/Auth";
import CreateContent from "./Screens/CreateContent";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/UploadContent" element={<CreateContent />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
