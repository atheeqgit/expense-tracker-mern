const IncomeSchema = require("../models/incomeModel");

exports.addIncome = async (req, res) => {
  const { title, amount, type, category, date, description } = req.body;

  const income = IncomeSchema({
    title,
    amount,
    type,
    date,
    category,
    description,
  });

  try {
    if (!title || !amount || !type || !date || !category || !description) {
      res.status(400).json({ message: "all fields are required" });
    }
    if (amount < 0 || amount > 2000000 || !amount === "number") {
      res
        .status(400)
        .json({ message: "the amount must be between 0 and 2000000" });
    }

    // const result =
    await income.save();

    res.status(200).json({ message: "income was successfully Added" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllIncomes = async (req, res) => {
  try {
    const result = await IncomeSchema.find().sort({ createdAt: -1 });
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await IncomeSchema.deleteOne({ _id: id });

    if (!result) {
      throw Error("Income does not exist");
    }

    res.status(200).json({ message: "Income is deleted" });
  } catch (err) {
    res.status(400).json({ messaage: err.message });
  }
};
