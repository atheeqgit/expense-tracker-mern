import React from "react";
import "./card.css";
import { useGlobalContext } from "../../context";

const Card = ({ data }) => {
  const { title, type, amount, description, date, _id, createdAt } = data;

  const { deleteIncome, deleteExpense, dateFormat } = useGlobalContext();

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
      <div className="card-first">
        <h2>₹{amount}</h2>
        <h3 className="card-title">{title}</h3>
      </div>
      <div className="card-middle">
        <p className="card-btns">
          <i class="fa-solid fa-comment-medical"></i> <p>{description}</p>
        </p>
        <p className="card-btns">
          <i class="fa-solid fa-calendar-days"></i>
          <p>{dateFormat(date)}</p>
        </p>
      </div>
      <div className="card-btns tool">
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
