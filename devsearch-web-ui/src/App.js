import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/screens/Home/Header";
import Developers from "./components/screens/Home/Developers";
import Projects from "./components/screens/Projects";
import Inbox from "./components/screens/Inbox";
import Profile from "./components/screens/Profiles/Profile";
import ProfileEdit from "./components/screens/Profiles/ProfileEdit";
import PublicProfile from "./components/screens/Profiles/PublicProfile";

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
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/profile/:username/edit" element={<ProfileEdit />} />
          <Route path="/profile/public/:username" element={<PublicProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
