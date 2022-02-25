import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/screens/Home/Header";
import Footer from "./components/screens/Home/Footer";
import Home from "./components/screens/Home/Home";
import Developers from "./components/screens/Developers";
import Projects from "./components/screens/Projects";
import Inbox from "./components/screens/Inbox";
import PrivateProfile from "./components/screens/Profiles/PrivateProfile";
import Login from "./components/screens/Users/Login";
import Register from "./components/screens/Users/Register";
import ForgetPassword from "./components/screens/ForgetPassword";

import { useSelector } from "react-redux";

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route
            path="/profile/private"
            element={userInfo ? <PrivateProfile /> : <Navigate to="/login" />}
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
