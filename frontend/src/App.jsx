import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Settings from "./pages/settings/Settings";
import RecentTransactions from "./pages/recentTransactions/RecentTransactions";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app" id="container">
      <Router>
        <div className="aside-layout">
          <Navbar />
        </div>
        <div className="main-layout" id="container">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/recent" element={<RecentTransactions />}></Route>
            <Route path="/settings" element={<Settings />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
