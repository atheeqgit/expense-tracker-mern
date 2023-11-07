const express = require("express");
require("dotenv").config();
const router = express.Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SCERET, { expiresIn: "7d" });
};

router.post("/users/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!email || !password) {
      throw Error("All fields should be filled");
    }
    if (!validator.isEmail(email)) {
      throw Error("Email is not valid");
    }
    if (+password.length < 6) {
      throw Error("password must be contain atleast 6 characters ");
    }

    const emailExists = await userModel.findOne({ email });

    if (emailExists) {
      throw Error("email already exists ,try to login");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      username: username,
      email: email,
      password: hashedPassword,
    });

    const result = await newUser.save();
    const token = createToken(result._id);

    res.status(200).json({ user: result, token });
  } catch (err) {
    res.status(500).json({ message: "something went wrong!" });
    console.log(err);
  }
});

router.post("/users/login", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!email || !password || !username) {
      throw Error("All fields should be filled");
    }

    const emailExists = await userModel.findOne({ email });

    if (!emailExists) {
      throw Error("email does exists ,try to Register");
    }

    const match = await bcrypt.compare(password, emailExists.password);

    if (!match) {
      throw Error("password is incorrect");
    }
    const token = createToken(emailExists._id);

    res.status(200).json({ user: emailExists, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
