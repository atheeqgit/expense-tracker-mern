import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGlobalContext } from "../../context";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="login-container">
      {isLogin ? (
        <LoginForm setIsLogin={setIsLogin} />
      ) : (
        <RegisterForm setIsLogin={setIsLogin} />
      )}
    </div>
  );
};

const LoginForm = ({ setIsLogin }) => {
  const { setUserID } = useGlobalContext();
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const [loginInputs, setLoginInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = loginInputs;
  const onChanging = (e) => {
    setLoginInputs({ ...loginInputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const result = await axios.post(
        "http://127.0.0.1:5000/api/v1/users/login",
        loginInputs
      );

      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.user._id);
      navigate("/");
      toast.success("You have Successfully Logged in!");
      setUserID(result.data.user._id);
    } catch (error) {
      toast.error(error.response.data.message);
      console.error(error);
    }
  };

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        if (!password == "" || !username == "" || !password == "") {
          handleSubmit();
        } else {
          toast.error("Please enter all the fields");
        }
      }}
    >
      <div className="form-control">
        <h1>
          <i class="fa-solid fa-circle-user"></i> login
        </h1>
        <p>welcome back ! , please fillout all the inputs.</p>
      </div>
      <div className="form-control">
        <label htmlFor="username">
          <i class="fa-solid fa-user"></i> username
        </label>
        <input
          type="string"
          name="username"
          onChange={(e) => {
            onChanging(e);
          }}
          value={username}
          placeholder="Enter username"
        />
      </div>
      <div className="form-control">
        <label htmlFor="email">
          <i class="fa-solid fa-envelope"></i> email
        </label>
        <input
          type="string"
          name="email"
          onChange={(e) => {
            onChanging(e);
          }}
          value={email}
          placeholder="Enter email "
        />
      </div>
      <div className="form-control">
        <label htmlFor="password">
          <i class="fa-solid fa-lock"></i> Password
        </label>
        <input
          type="password"
          name="password"
          onChange={(e) => {
            onChanging(e);
          }}
          value={password}
          placeholder="Enter password"
        />
      </div>
      <button type="submit">login</button>
      <p
        onClick={() => {
          setIsLogin(false);
        }}
      >
        don't have an account?... <span>register</span>
      </p>
    </form>
  );
};

const RegisterForm = ({ setIsLogin }) => {
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const { setUserID } = useGlobalContext();

  const [loginInputs, setLoginInputs] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = loginInputs;
  const [confirmPassword, setConfirmPassword] = useState("");

  const onChanging = (e) => {
    setLoginInputs({ ...loginInputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    try {
      const result = await axios.post(
        "http://127.0.0.1:5000/api/v1/users/register",
        loginInputs
      );

      setCookies("access_token", result.data.token);
      window.localStorage.setItem("userID", result.data.user._id);
      navigate("/");
      toast.success("You have Successfully Logged in!");
      setUserID(result.data.user._id);
    } catch (error) {
      toast.error("error Occureded loging in!");
      console.error(error);
    }
  };

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        if (
          password == "" ||
          username == "" ||
          password == "" ||
          confirmPassword == ""
        ) {
          toast.error("Please enter all the fields");
        } else if (password !== confirmPassword) {
          toast.error("enter both password correctly");
        } else {
          handleSubmit();
        }
      }}
    >
      <div className="form-control">
        <h1>
          <i class="fa-solid fa-circle-user"></i> Register
        </h1>
        <p>welcome , please fillout all the inputs.</p>
      </div>
      <div className="form-control">
        <label htmlFor="username">
          <i class="fa-solid fa-user"></i> username
        </label>
        <input
          type="string"
          name="username"
          onChange={(e) => {
            onChanging(e);
          }}
          value={username}
          placeholder="Enter username"
        />
      </div>
      <div className="form-control">
        <label htmlFor="email">
          <i class="fa-solid fa-envelope"></i> email
        </label>
        <input
          type="string"
          name="email"
          onChange={(e) => {
            onChanging(e);
          }}
          value={email}
          placeholder="Enter email "
        />
      </div>
      <div className="form-control">
        <label htmlFor="password">
          <i class="fa-solid fa-lock"></i> Password
        </label>
        <input
          type="password"
          name="password"
          onChange={(e) => {
            onChanging(e);
          }}
          value={password}
          placeholder="Enter password"
        />
      </div>
      <div className="form-control">
        <label htmlFor="confirm password">
          <i class="fa-solid fa-lock"></i> confirm Password
        </label>
        <input
          type="password"
          name="confirm Password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          value={confirmPassword}
          placeholder="Confirm Password"
        />
      </div>

      <button type="submit">Register</button>
      <p
        onClick={() => {
          setIsLogin(true);
        }}
      >
        already have an account?... <span>login</span>
      </p>
    </form>
  );
};

export default Login;
