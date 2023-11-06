const {
  addIncome,
  getAllIncomes,
  deleteIncome,
} = require("../controllers/income");
const router = require("express").Router();

//POST income
router.post("/add-income", addIncome);

//GET all incomes
router.get("/get-incomes", getAllIncomes);

router.delete("/delete-income/:id", deleteIncome);

module.exports = router;
