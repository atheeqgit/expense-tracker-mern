import React, { useEffect } from "react";
import "./home.css";
import { useGlobalContext } from "../../context";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const { getAllIncomes, allIncomes, getIncomes, getExpense } =
    useGlobalContext();

  const navigate = useNavigate();

  useEffect(() => {
    getAllIncomes();
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
            navigate("/form");
          }}
        >
          add Income
        </button>
        <button
          style={{
            backgroundColor: ` #ff6d6d`,
          }}
          onClick={() => {
            navigate("/form");
          }}
        >
          add expense
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
        {allIncomes?.map((income) => {
          return <Card data={income} />;
        })}
      </div>
    </div>
  );
};

export default Home;
