import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/screens/Home/Header";
import Developers from "./components/screens/Home/Developers";
import Projects from "./components/screens/Projects";
import Inbox from "./components/screens/Inbox";
import PrivateProfile from "./components/screens/Profiles/PrivateProfile";
import PrivateProfileEdit from "./components/screens/Profiles/PrivateProfileEdit";
import PublicProfile from "./components/screens/Profiles/PublicProfile";
import UserService from "./services/identity/keycloakUserService";

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
          <Route path="/profile/private" element={<PrivateProfile />} />
          <Route
            path="/profile/private/edit"
            element={<PrivateProfileEdit />}
          />
          <Route
            path="/profile/public/:profilePublicId"
            element={<PublicProfile />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
