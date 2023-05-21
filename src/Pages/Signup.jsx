import React, { useContext, useState } from "react";
import "./Signup.css";
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { userContext } from "../App";
import { BASE_URL } from "../utility/baseUrl";

function Signup() {
  const { emailid, setEmailid, setUser, user } = useContext(userContext);
  const cookies = new Cookies();

  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [cpass, setCpass] = useState();
  const [error, setError] = useState();
  const [match, setMatch] = useState();
  const [loading, setLoading] = useState(false);

  const updateEmail = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const updatePass = (e) => {
    setPass(e.target.value);
    console.log(pass);
  };

  const updateCpass = (e) => {
    setCpass(e.target.value);
    console.log(pass);
  };

  const signup = async () => {
    setLoading(true);
    if (pass === cpass) {
      setMatch(undefined);
      await axios
        .post(`${BASE_URL}/signup`, {
          email: email,
          password: pass,
        })
        .then((res) => {
          cookies.set("token", res?.data?.token);
          const status = res?.data.status;
          const message = res?.data.message;
          const userid = res?.data.userid;
          const email = res?.data.email;
          console.log(status);
          if (status === "success") {
            setEmailid(email);
            setUser(userid);
            setLoading(false);
            navigate("/welcome", { replace: true });
          } else {
            setLoading(false);
            setError(message);
          }
        });
    } else {
      setLoading(false);
      setMatch("password does not match");
    }
  };

  return (
    <div className="signup">
      <div className="signup-form">
        <div className="hero">lets confession!</div>
        <div className="details">
          <input
            onChange={updateEmail}
            className="email"
            type="email"
            placeholder="email..."
          />
          <div className="error-message">{error}</div>
          <input
            onChange={updatePass}
            className="pass"
            type="password"
            placeholder="pass..."
          />
          <input
            onChange={updateCpass}
            className="confirmpass"
            type="password"
            placeholder="repeat pass..."
          />
          <div className="pass-match">{match}</div>
        </div>
        <div className="btn">
          {loading ? (
            <CircularProgress />
          ) : (
            <Button onClick={signup} variant="contained">
              signup
            </Button>
          )}
        </div>
        <span>
          already have an account? <a href="/login">login</a>{" "}
        </span>
      </div>
    </div>
  );
}

export default Signup;
