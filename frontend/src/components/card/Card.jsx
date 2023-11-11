import React from "react";
import "./card.css";

const Card = ({ data }) => {
  const { title, type, amount, description, date, _id } = data;

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
      <h2>${amount}</h2>
      <p>{description}</p>
      <p>{date}</p>
      <div className="card-btns">edit delete</div>
    </div>
  );
};

export default Card;
