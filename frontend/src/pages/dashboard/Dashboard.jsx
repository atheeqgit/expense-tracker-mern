import "./dashboard.css";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { getIncomes, getExpense, incomes, expense } = useGlobalContext();

  const [isIncome, setIsIncome] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getIncomes();
    getExpense();
  }, []);

  return (
    <div className="home">
      <div className="info-div">infos div</div>
      <div className="btns-div">
        <button
          style={{
            backgroundColor: ` rgb(37 255 55)`,
          }}
          onClick={() => {
            setIsIncome(!isIncome);
          }}
        >
          SHOW {isIncome ? "EXPENSES" : "INCOMES"}
        </button>
      </div>
      <div className="transactions-div">
        <div
          className="card"
          style={{
            color: `var(--dark-font)`,
            backgroundColor: `var(--lightBlue)`,
          }}
        >
          <p className="card-title">Title</p>
          <p>Amount</p>
          <p>description</p>
          <p>date & time</p>
          <p className="card-btns">tools</p>
        </div>
        {isIncome
          ? incomes?.map((income) => {
              return <Card data={income} />;
            })
          : expense?.map((expense) => {
              return <Card data={expense} />;
            })}
      </div>
    </div>
  );
};

export default Dashboard;
