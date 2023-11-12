import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Settings from "./pages/settings/Settings";
import RecentTransactions from "./pages/recentTransactions/RecentTransactions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./pages/form/Form";
import Login from "./pages/login/Login";
import { useGlobalContext } from "./context";

function App() {
  const [count, setCount] = useState(0);
  const { userID } = useGlobalContext();

  return (
    <div className="app" id="container">
      <ToastContainer autoClose={4000} hideProgressBar={true} />
      <Router>
        <div className="aside-layout">
          <Navbar />
        </div>
        <div className="main-layout" id="container">
          <Routes>
            {userID ? (
              <>
                <Route path="/" element={<Home />}></Route>

                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/recent" element={<RecentTransactions />}></Route>
                <Route path="/settings" element={<Settings />}></Route>
                <Route path="/form" element={<Form />}></Route>
              </>
            ) : (
              <Route path="/login" element={<Login />}></Route>
            )}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
