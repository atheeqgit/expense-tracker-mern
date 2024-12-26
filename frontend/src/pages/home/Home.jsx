import React, { useEffect } from "react";
import "./home.css";
import { useGlobalContext } from "../../context";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import Infobox from "../../components/infobox/Infobox";
import FloatingBtn from "../../components/floatingBtn/FloatingBtn";
import Legend from "../../components/legend/Legend";

const Home = () => {
  const { getAllIncomes, allIncomes, getIncomes, getExpense, userDetails } =
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
      <h1 className="title-text">Welcome, {userDetails.username}</h1>
      <Infobox />
      <div className="transactions-div">
        <div className="trans-title-div">
          <h1 className="title-text">last five Trancactions</h1>
          <button
            onClick={() => {
              navigate("/recent");
            }}
          >
            view all <i class="fa-solid fa-chevron-down"></i>
          </button>
        </div>

        <Legend />

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
