import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/screens/Home/Header";
import Footer from "./components/screens/Home/Footer";
import Index from "./components/screens/Home/Index";
import Projects from "./components/screens/Projects";
import Inbox from "./components/screens/Inbox";
import PrivateProfile from "./components/screens/Profiles/PrivateProfile";
import PrivateProfileEdit from "./components/screens/Profiles/PrivateProfileEdit";
import PublicProfile from "./components/screens/Profiles/PublicProfile";
import Login from "./components/screens/Users/Login";
import Register from "./components/screens/Users/Register";
import ForgetPassword from "./components/screens/ForgetPassword";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
