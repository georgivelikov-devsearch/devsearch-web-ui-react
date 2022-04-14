import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/common/Header";
import Inbox from "./components/screens/Inbox";
import Developers from "./components/screens/Developers/Developers";

import DeveloperEdit from "./components/screens/Developers/DeveloperEdit";
import Developer from "./components/screens/Developers/Developer";
import Projects from "./components/screens/Projects/Projects";
import ProjectNew from "./components/screens/Projects/ProjectNew";

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
          <Route path="/developers/:username" element={<Developer />} />
          <Route
            path="/developers/:username/project/new"
            element={<ProjectNew />}
          />
          <Route
            path="/developers/:username/edit"
            element={<DeveloperEdit />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
