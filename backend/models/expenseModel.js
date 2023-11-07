const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ExpenseModel = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 100,
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
      maxLength: 20,
    },
    type: {
      type: String,
      required: true,
      maxLength: 30,
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxLength: 200,
    },
    userOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("expense", ExpenseModel);
