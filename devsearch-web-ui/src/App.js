import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/common/Header";
import Developers from "./components/screens/Developers/Developers";
import Projects from "./components/screens/Projects";
import Inbox from "./components/screens/Inbox";
import DeveloperPrivate from "./components/screens/Developers/DeveloperPrivate";
import DeveloperEdit from "./components/screens/Developers/DeveloperEdit";
import DeveloperPublic from "./components/screens/Developers/DeveloperPublic";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/developers?page=1" />}
          ></Route>
          <Route path="/developers" element={<Developers />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/developers/:username" element={<DeveloperPrivate />} />
          <Route
            path="/developers/:username/edit"
            element={<DeveloperEdit />}
          />
          <Route
            path="/developers/public/:username"
            element={<DeveloperPublic />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
