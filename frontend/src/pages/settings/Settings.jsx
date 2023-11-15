import React from "react";
import "./settings.css";
import { useCookies } from "react-cookie";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const { setUserID, userID, setdarkMode, darkMode } = useGlobalContext();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/login");
    toast.success("You have success fully logged out");
    setUserID("");
  };
  return (
    <div>
      <h1 className="title-text2">
        <i className="fa-solid fa-gear"></i> settings
      </h1>
      <div className="setting-content">
        <div className="nav-btns">
          <button
            onClick={() => {
              setdarkMode(!darkMode);
            }}
          >
            {darkMode ? "turn Off darkmode" : "turn on darkmode"}
          </button>
        </div>
        <div className="nav-btns">
          <button
            onClick={() => {
              logout();
            }}
          >
            logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
