import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const Context = createContext();

export function GlobalProvider({ children }) {
  // const toastify = (msg ,resStatus) => {
  //   toast.resStatus(msg)
  // };

  const [allIncomes, setAllIncomes] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [expense, setExpense] = useState([]);
  const [userID, setUserID] = useState("");

  useEffect(() => {
    if (window.localStorage.getItem("userID")) {
      setUserID(window.localStorage.getItem("userID"));
      getAllIncomes();
      getIncomes();
      getExpense();
    }
  }, []);

  //    Inccome
  // router
  // .post("/add-income", addIncome)
  // .get("/get-All-incomes", getAllIncomes)
  // .get("/get-income/:id", getIncome)
  // .delete("/delete-income/:id", deleteIncome)
  // .patch("/update-income/:id", updateIncome);
  const baseURL = "http://127.0.0.1:5000/api/v1";

  // ======== POST INCOME & EXPENSE =============================

  const addIncome = async (body) => {
    try {
      const result = await axios.post(baseURL + "/add-income", {
        ...body,
        userOwner: userID,
      });
      //   console.log(result);
      toast.success(result.data.message);
      setAllIncomes([...allIncomes, body]);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const addExpense = async (body) => {
    try {
      const result = await axios.post(baseURL + "/add-expense", {
        ...body,
        userOwner: userID,
      });

      toast.success(result.data.message);
      //   console.log(result);
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  // ======== GEt ALL INCOMES =============================

  const getAllIncomes = async () => {
    const sortedArray = [...incomes, ...expense];

    setAllIncomes(sortedArray);
  };

  // ======== GET INCOME & EXPENSE =============================

  const getIncomes = async () => {
    const result = await axios.get(baseURL + `/get-income/${userID}`);
    setIncomes(result.data);
  };

  const getExpense = async () => {
    const result = await axios.get(baseURL + `/get-expense/${userID}`);
    setExpense(result.data);
  };

  // ======== DELETE INCOME & EXPENSE =============================

  const deleteIncome = async (id) => {
    try {
      const result = await axios.delete(baseURL + `/delete-income/${id}`);

      const filteredArr = incomes.filter((income) => {
        if (income._id != id) {
          return income;
        }
      });

      if (result.status == 200) {
        toast.success(result.data.message);
      } else {
        toast.error(result);
      }

      setIncomes(filteredArr);
      getAllIncomes();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const deleteExpense = async (id) => {
    try {
      const result = await axios.delete(baseURL + `/delete-expense/${id}`);

      const filteredArr = expense.filter((expense) => {
        if (expense._id != id) {
          return expense;
        }
      });
      setExpense(filteredArr);
      getAllIncomes();
      toast.success(result.data.message);
    } catch (err) {
      toast.error(err.response.data.message);
    }
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
        deleteExpense,
        userID,
        setUserID,
        deleteIncome,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(Context);
};
