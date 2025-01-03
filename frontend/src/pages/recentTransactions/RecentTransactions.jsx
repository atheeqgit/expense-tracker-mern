import React, { useEffect } from "react";
import "./recentTransactions.css";
import { useGlobalContext } from "../../context";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import Infobox from "../../components/infobox/Infobox";
import FloatingBtn from "../../components/floatingBtn/FloatingBtn";
import Legend from "../../components/legend/Legend";

const RecentTransactions = () => {
  const { recent, setRecent, allIncomes, getIncomes, getExpense } =
    useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpense();
  }, []);
  const navigate = useNavigate();

  return (
    <div className="recent">
      <FloatingBtn />
      <h1 className="title-text2">
        <i className="fa-solid fa-clock-rotate-left"></i> recent
      </h1>
      <div className="transactions-div">
        <h1 className="title-text">all recent Trancactions</h1>
        <Legend />

        {recent.length != 0 ? (
          recent.map((income, index) => {
            return <Card data={income} key={index} />;
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

export default RecentTransactions;
