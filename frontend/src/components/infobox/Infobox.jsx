import React from "react";
import "./infobox.css";
import { useGlobalContext } from "../../context";

const Infobox = () => {
  const { getTotalIncome, getTotalExpense, getTotalBalance } =
    useGlobalContext();
  return (
    <div className="info-div">
      <div className="info-card">
        <p>total income</p>
        <h2>₹{getTotalIncome()}</h2>
      </div>
      <div className="info-card">
        <p>total expense</p>
        <h2>₹{getTotalExpense()}</h2>
      </div>
      <div className="info-card">
        <p>balance</p>
        <h2>₹{getTotalBalance()}</h2>
      </div>
    </div>
  );
};

export default Infobox;
