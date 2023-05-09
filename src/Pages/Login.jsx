import React, { useState, useContext } from "react";
import "./Login.css";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";
import Cookies from "universal-cookie";

function Login() {
  const { emailid, errorText, setErrorText, setEmailid, setUser, user } =
    useContext(userContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const cookies = new Cookies();

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePass = (e) => {
    setPass(e.target.value);
  };

  const login = async () => {
    setLoading(true);
    await axios
      .get(
        `https://confessionity-node-sem-6-p.onrender.com/login?email=${email}&pass=${pass}`
      )
      .then((res) => {
        cookies.set("token", res?.data?.token, { maxAge: 604800 });
        const status = res?.data.status;
        const message = res?.data.message;
        const userid = res?.data.userid;
        const email = res?.data.email;
        if (status === "success") {
          setErrorText(undefined);
          setEmailid(email);
          setLoading(false);
          setUser(userid);
          navigate("/", { replace: true });
        } else {
          setLoading(false);
          setError(message);
          console.log(error);
        }
      });
  };

  return (
    <>
      <div className="error-text">{errorText}</div>
      <div className="login">
        <div className="login-form">
          <div className="hero">welcome back!</div>
          <div className="details">
            <input
              onChange={updateEmail}
              className="email"
              type="email"
              placeholder="email..."
            />
            <input
              onChange={updatePass}
              className="pass"
              type="password"
              placeholder="pass..."
            />
          </div>
          <div className="error-message">{error}</div>
          <div className="btn">
            {loading ? (
              <CircularProgress />
            ) : (
              <Button onClick={login} variant="contained">
                login
              </Button>
            )}
          </div>
          <span>
            dont have an account? <a href="/signup">signup</a>{" "}
          </span>
        </div>
      </div>
    </>
  );
}

export default Login;
