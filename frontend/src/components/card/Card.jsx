import React from "react";
import "./card.css";
import { useGlobalContext } from "../../context";

const Card = ({ data }) => {
  const { title, type, amount, description, date, _id } = data;

  const { deleteIncome, deleteExpense } = useGlobalContext();

  const handleDelete = (id) => {
    if (type == "income") {
      deleteIncome(id);
    } else {
      deleteExpense(id);
    }
  };

  return (
    <div
      className="card"
      id={_id}
      style={{
        boxShadow: `6px 6px ${
          type == "income" ? "rgb(0, 255, 21)" : "red"
        }, -1px 0 0.3em #6d6d6d38`,
      }}
    >
      <h3 className="card-title">{title}</h3>
      <h2>
        <i class="fa-solid fa-dollar-sign"></i>
        {amount}
      </h2>
      <p>
        <i class="fa-solid fa-comment-medical"></i> {description}
      </p>
      <p>
        <i class="fa-solid fa-calendar-days"></i> {date}
      </p>
      <div className="card-btns">
        <i class="fa-solid fa-pen-to-square"></i>{" "}
        <i
          class="fa-solid fa-trash"
          onClick={() => {
            handleDelete(_id);
          }}
        ></i>
      </div>
    </div>
  );
};

export default Card;
