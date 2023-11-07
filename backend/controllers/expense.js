const ExpenseSchema = require("../models/expenseModel");

//ADD Expense function
exports.addExpense = async (req, res) => {
  const { title, amount, type, category, date, description, userOwner } =
    req.body;

  const expense = ExpenseSchema({
    title,
    amount,
    type,
    date,
    category,
    description,
    userOwner,
  });

  try {
    if (!title || !amount || !type || !date || !category || !description) {
      res.status(500).json({ message: "all fields are required" });
    } else if (amount < 0 || amount > 2000000 || !amount === "number") {
      res
        .status(500)
        .json({ message: "the amount must be between 0 and 2000000" });
    } else if (title == "") {
      res.status(500).json({ message: "the title must be filled" });
    } else {
      // const result =
      await expense.save();

      res.status(200).json({ message: "expense was successfully Added" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get ALL Expense function
exports.getExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await ExpenseSchema.find({ userOwner: id });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//delete Expense function
exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await ExpenseSchema.deleteOne({ _id: id });

    if (!result) {
      throw Error("Expense does not exist");
    }

    res.status(200).json({ message: "Expense is deleted" });
  } catch (err) {
    res.status(500).json({ messaage: err.message });
  }
};

// update expense
exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const result = await ExpenseSchema.findByIdAndUpdate({ _id: id }, body);

    if (!result) {
      throw Error("Expense does not exist");
    }

    res.status(200).json({ message: "Expense is is updated" });
  } catch (err) {
    res.status(500).json({ messaage: err.message });
  }
};
