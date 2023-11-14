import React from "react";
import { useNavigate } from "react-router-dom";

const FloatingBtn = () => {
  const navigate = useNavigate();
  return (
    <div
      className="floating-btn"
      onClick={() => {
        navigate("/form");
      }}
    >
      <i class="fa-solid fa-circle-plus"></i> add transaction
    </div>
  );
};

export default FloatingBtn;
