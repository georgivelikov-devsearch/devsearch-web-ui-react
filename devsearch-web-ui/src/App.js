import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Developers from "./components/Developers";
import Projects from "./components/Projects";
import Inbox from "./components/Inbox";
import Profile from "./components/Profile";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
