import React, { useEffect } from "react";
import "./home.css";
import { useGlobalContext } from "../../context";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import Infobox from "../../components/infobox/Infobox";
import FloatingBtn from "../../components/floatingBtn/FloatingBtn";

const Home = () => {
  const { getAllIncomes, allIncomes, getIncomes, getExpense } =
    useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpense();
  }, []);
  const navigate = useNavigate();

  return (
    <div className="home">
      <FloatingBtn />
      <h1 className="title-text2">
        <i className="fa-solid fa-house"></i> home
      </h1>
      <Infobox />
      <div className="transactions-div">
        <div className="trans-title-div">
          <h1 className="title-text">3 recent Trancactions</h1>
          <button
            onClick={() => {
              navigate("/recent");
            }}
          >
            view all Transactions <i class="fa-solid fa-chevron-down"></i>
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
        {allIncomes.length != [] ? (
          allIncomes.map((income, index) => {
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

export default Home;
