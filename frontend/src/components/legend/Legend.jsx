import React from "react";

const Legend = () => {
  return (
    <div
      className="card legendof"
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
  );
};

export default Legend;
