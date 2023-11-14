import "./dashboard.css";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../context";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import LineChart from "../../components/lineChart/LineChart";
import FloatingBtn from "../../components/floatingBtn/FloatingBtn";

const Dashboard = () => {
  const { getIncomes, getExpense, incomes, expense } = useGlobalContext();

  const [isIncome, setIsIncome] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    getIncomes();
    getExpense();
  }, []);

  return (
    <div className="dashboard">
      <FloatingBtn />
      <h1 className="title-text2">
        <i className="fa-solid fa-chart-line"></i> dashboard
      </h1>
      <div className="charts">
        <LineChart />
      </div>

      <div className="transactions-div">
        <div className="btns-div">
          <h1 className="title-text">
            {isIncome ? "all incomes " : "all expenses"}
          </h1>
          <button
            onClick={() => {
              setIsIncome(!isIncome);
            }}
          >
            view {isIncome ? "expenses" : "incomes"}{" "}
            <i class="fa-solid fa-chevron-down"></i>
          </button>
        </div>
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
          <p className="card-btns">date & time</p>
          <p className="card-btns">tools</p>
        </div>
        {isIncome ? (
          incomes.length != 0 ? (
            incomes.map((income) => {
              return <Card data={income} />;
            })
          ) : (
            <p className="no-transactions">
              there are no previous transactions .... please add
            </p>
          )
        ) : expense.length != 0 ? (
          expense.map((expense) => {
            return <Card data={expense} />;
          })
        ) : (
          <p className="no-transactions">
            there are no previous transactions .... please add
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
