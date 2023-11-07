const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  incomes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "income",
    },
  ],
  expense: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "expense",
    },
  ],
});

module.exports = mongoose.model("users", UserSchema);
