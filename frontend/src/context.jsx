import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";

export const Context = createContext();

export function GlobalProvider({ children }) {
  // const toastify = (msg ,resStatus) => {
  //   toast.resStatus(msg)
  // };

  const [allIncomes, setAllIncomes] = useState([]);
  const [recent, setRecent] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [expense, setExpense] = useState([]);
  const [userID, setUserID] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [darkMode, setdarkMode] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem("userID")) {
      setUserID(window.localStorage.getItem("userID"));
      setUserDetails(window.localStorage.getItem("userDetails"));
      getAllIncomes();

      const chartData = () => {
        const duplicateArray = recent?.map((item) => {
          return dateFormat(item.date);
        });

        const dateArray = duplicateArray.filter((value, index) => {
          return duplicateArray.indexOf(value) === index;
        });

        let finalArray = dateArray.map((date, index) => {
          let inc = 0;
          incomes.forEach((item) => {
            if (dateFormat(item.date) == date) {
              inc = inc + item.amount;
            }
          });
          let exp = 0;
          expense.forEach((item) => {
            if (dateFormat(item.date) == date) {
              exp = exp + item.amount;
            }
          });

          return {
            date: date,
            income: inc,
            expense: exp,
          };
        });

        if (finalArray.length > 10) {
          finalArray = finalArray.slice(0, 10);
        }

        finalArray.reverse();
        setChartData(finalArray);
      };
      chartData();
    }
  }, [incomes, expense]);

  // const baseURL = "http://127.0.0.1:5000/api/v1";
  const baseURL = "https://expense-tracker-backend-cpma.onrender.com/api/v1";

  // ======== POST INCOME & EXPENSE =============================

  const addIncome = async (body) => {
    try {
      const result = await axios.post(baseURL + "/add-income", {
        ...body,
        userOwner: userID,
      });
      //   console.log(result);
      toast.success(result.data.message);

      // setAllIncomes([...allIncomes, { ...body, _id: userID }]);
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
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  // ======== GEt ALL INCOMES =============================

  const getAllIncomes = async () => {
    if (incomes.length >= 0) {
      const combinedArr = [...incomes, ...expense];

      combinedArr.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });

      setAllIncomes(combinedArr.slice(0, 5));
      setRecent(combinedArr);
    }
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

  // ======= DATE formater =================================

  const dateFormat = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };
  // ======= get total income & Expense =================================

  const getTotalIncome = () => {
    let totalIncome = 0;

    incomes.forEach((income) => {
      totalIncome += income.amount;
    });

    return totalIncome;
  };

  const getTotalExpense = () => {
    let totalExpense = 0;

    expense.forEach((expense) => {
      totalExpense += expense.amount;
    });

    return totalExpense;
  };

  const getTotalBalance = () => {
    let totalBalance = 0;

    totalBalance = getTotalIncome() - getTotalExpense();

    return totalBalance;
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
        dateFormat,
        getTotalIncome,
        getTotalExpense,
        getTotalBalance,
        recent,
        setRecent,
        chartData,
        darkMode,
        setdarkMode,
        userDetails,
        setUserDetails,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(Context);
};
