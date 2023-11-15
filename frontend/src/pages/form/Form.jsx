import React, { useState } from "react";
import "./form.css";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { useGlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const { addIncome, addExpense } = useGlobalContext();

  const [inputValues, setInputValues] = useState({
    title: "",
    amount: "",
    type: "income",
    description: "",
    date: "",
    category: "",
  });

  const { title, amount, type, description, date, category } = inputValues;

  const [submitType, setSubmitType] = useState("income");

  const onChanging = (e) => {
    const name = e.target.name;

    setInputValues({ ...inputValues, [name]: e.target.value });
    // console.log(amount);
  };

  const handleSubmit = () => {
    if (
      !title == "" ||
      !amount == "" ||
      !amount == 0 ||
      !date == "" ||
      !date == null
    ) {
      if (submitType == "income") {
        addIncome(inputValues);
      } else {
        addExpense(inputValues);
      }

      setInputValues({
        title: "",
        amount: "",
        type: "income",
        description: "",
        date: "",
        category: "",
      });
    } else {
      console.log("enter all inputs");
    }
  };
  return (
    <div className="form-container">
      <form
        className="form"
        id="sm-padding sm-margin"
        style={{
          boxShadow: `6px 6px ${
            submitType == "income" ? "rgb(0, 255, 21)" : "red"
          }, -1px 0 0.3em #6d6d6d38`,
        }}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {submitType == "income" ? <h1>add Income</h1> : <h1>add expense</h1>}
        <div className="form-control">
          <input
            className="amount"
            type="number"
            name="amount"
            min={1}
            value={amount}
            onChange={(e) => {
              onChanging(e);
            }}
            placeholder="$000"
          />
        </div>
        <div className="form-control">
          <input
            type="string"
            name="title"
            value={title}
            onChange={(e) => {
              onChanging(e);
            }}
            placeholder="Enter title"
          />
        </div>
        <div className="form-control-date">
          <DatePicker
            id="date"
            placeholderText="Enter A Date"
            selected={date}
            value={date}
            placeholder="Enter a date"
            dateFormat="d/MM/yyyy"
            onChange={(date) => {
              setInputValues({ ...inputValues, date: date });
            }}
          />
          <select
            required
            value={type}
            name="type"
            id="type"
            onChange={(e) => {
              setSubmitType(e.target.value);
              onChanging(e);
            }}
          >
            <option value="income">INCOME</option>
            <option value="expense">EXPENSE</option>
          </select>
        </div>
        <div className="form-control">
          <input
            type="text"
            value={description}
            name="description"
            onChange={(e) => {
              onChanging(e);
            }}
            placeholder="Enter description"
          />
          <select
            required
            value={category}
            name="category"
            id="category"
            onChange={(e) => {
              onChanging(e);
            }}
          >
            <option value="" disabled>
              Select Option
            </option>
            <option value="salary">Salary</option>
            <option value="freelancing">Freelancing</option>
            <option value="investments">Investiments</option>
            <option value="stocks">Stocks</option>
            <option value="bitcoin">Bitcoin</option>
            <option value="bank">Bank Transfer</option>
            <option value="youtube">Youtube</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
        <p onClick={() => navigate(-1)}>
          <i class="fa-solid fa-chevron-left"></i> go Back
        </p>
      </form>
    </div>
  );
};

export default Form;
