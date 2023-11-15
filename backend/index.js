require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { readdirSync } = require("fs");

//creating express app and cors
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello");
});

//routes
readdirSync("./routes").map((route) => {
  app.use("/api/v1", require("./routes/" + route));
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("DB is connected ,listening on port " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("==========  db is not connected =================" + err);
  });
