import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const Context = createContext();

export function GlobalProvider({ children }) {
  const toastify = (msg) => toast(msg);

  const [allIncomes, setAllIncomes] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [expense, setExpense] = useState([]);

  //    Inccome
  // router
  // .post("/add-income", addIncome)
  // .get("/get-All-incomes", getAllIncomes)
  // .get("/get-income/:id", getIncome)
  // .delete("/delete-income/:id", deleteIncome)
  // .patch("/update-income/:id", updateIncome);
  const baseURL = "http://127.0.0.1:5000/api/v1";

  const addIncome = async (body) => {
    try {
      const result = await axios.post(baseURL + "/add-income", body);
      //   console.log(result);
      toastify(result.data.message);
      setAllIncomes([...allIncomes, body]);
    } catch (err) {
      toastify(err.response.data.message);
    }
  };

  const addExpense = async (body) => {
    try {
      const result = await axios.post(baseURL + "/add-expense", body);

      toastify(result.data.message);
      //   console.log(result);
    } catch (err) {
      toastify(err.response.data.message);
    }
  };

  const getAllIncomes = async () => {
    try {
      const result = await axios.get(baseURL + "/get-All-incomes");

      setAllIncomes(result.data);
      console.log(result);
    } catch (err) {
      toastify(err);
    }
  };

  const getIncomes = async () => {
    const result = await axios.get(
      baseURL + "/get-income/654a470777ea390337d2d863"
    );
    setIncomes(result.data);
  };
  const getExpense = async () => {
    const result = await axios.get(
      baseURL + "/get-expense/654a470777ea390337d2d863"
    );
    setExpense(result.data);
  };
  return (
    <Context.Provider
      value={{
        addIncome,
        addExpense,
        getAllIncomes,
        allIncomes,
        getIncomes,
        getExpense,
        incomes,
        expense,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(Context);
};
