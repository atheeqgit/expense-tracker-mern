const {
  addIncome,
  getIncome,
  deleteIncome,
  updateIncome,
  getAllIncomes,
} = require("../controllers/income");

const {
  addExpense,
  getExpense,
  deleteExpense,
  updateExpense,
} = require("../controllers/expense");

const router = require("express").Router();

// Inccome
router
  .post("/add-income", addIncome)
  .get("/get-All-incomes", getAllIncomes)
  .get("/get-income/:id", getIncome)
  .delete("/delete-income/:id", deleteIncome)
  .patch("/update-income/:id", updateIncome);

// Inccome
router
  .post("/add-expense", addExpense)
  .get("/get-expense/:id", getExpense)
  .delete("/delete-expense/:id", deleteExpense)
  .patch("/update-expense/:id", updateExpense);

module.exports = router;
