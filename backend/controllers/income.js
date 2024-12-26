const IncomeSchema = require("../models/incomeModel");

//ADD income function
exports.addIncome = async (req, res) => {
  const { title, amount, type, category, date, description, userOwner } =
    req.body;

  const income = IncomeSchema({
    title,
    amount,
    type: "income",
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
      await income.save();

      res.status(200).json({ message: "income was successfully Added" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//get ALL incomes by the user function
exports.getIncome = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await IncomeSchema.find({ userOwner: id });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllIncomes = async (req, res) => {
  try {
    const result = await IncomeSchema.find().sort({ createdAt: -1 });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//delete income function
exports.deleteIncome = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await IncomeSchema.deleteOne({ _id: id });

    if (!result) {
      throw Error("Income does not exist");
    }

    res.status(200).json({ message: "Income is deleted" });
  } catch (err) {
    res.status(500).json({ messaage: err.message });
  }
};

// update INCOME
exports.updateIncome = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const result = await IncomeSchema.findByIdAndUpdate({ _id: id }, body);

    if (!result) {
      throw Error("Income does not exist");
    }

    res.status(200).json({ message: "Income is is updated" });
  } catch (err) {
    res.status(500).json({ messaage: err.message });
  }
};
