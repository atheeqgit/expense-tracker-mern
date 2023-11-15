import React, { useState } from "react";
import "./navbar.css";
import { NavLink, Link, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useGlobalContext } from "../../context";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { setUserID, userID } = useGlobalContext();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div
        className="menu-btn"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        {menuOpen ? (
          <i class="fa-regular fa-circle-xmark"></i>
        ) : (
          <i class="fa-solid fa-bars"></i>
        )}
      </div>
      <div className={menuOpen ? "aside-layout show" : "aside-layout"}>
        <div className="navbar" id="padding">
          <div className="logo">expenseAt</div>
          <div className="links">
            {userID ? (
              <>
                <NavLink
                  to="/"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "link-active" : ""
                  }
                  onClick={() => {
                    setMenuOpen(!menuOpen);
                  }}
                >
                  <i className="fa-solid fa-house"></i>
                  <p>home</p>
                </NavLink>
                <NavLink
                  to="/dashboard"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "link-active" : ""
                  }
                  onClick={() => {
                    setMenuOpen(!menuOpen);
                  }}
                >
                  <i className="fa-solid fa-chart-line"></i>
                  <p>dashboard</p>
                </NavLink>
                <NavLink
                  to="/recent"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "link-active" : ""
                  }
                  onClick={() => {
                    setMenuOpen(!menuOpen);
                  }}
                >
                  <i className="fa-solid fa-clock-rotate-left"></i>
                  <p>recent</p>
                </NavLink>
                <NavLink
                  to="/settings"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "link-active" : ""
                  }
                  onClick={() => {
                    setMenuOpen(!menuOpen);
                  }}
                >
                  <i className="fa-solid fa-gear"></i>
                  <p>settings</p>
                </NavLink>
              </>
            ) : (
              <img src="/login-page.png"></img>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
