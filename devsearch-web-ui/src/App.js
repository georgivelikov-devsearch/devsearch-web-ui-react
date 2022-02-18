import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/screens/Header";
import Footer from "./components/screens/Footer";
import Home from "./components/screens/Home";
import Developers from "./components/screens/Developers";
import Projects from "./components/screens/Projects";
import Inbox from "./components/screens/Inbox";
import Profile from "./components/screens/Profile";
import Login from "./components/screens/Login";
import Register from "./components/screens/Register";
import ForgetPassword from "./components/screens/ForgetPassword";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/profile" element={<Profile />} />
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
