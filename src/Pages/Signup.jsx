import React, { useContext, useState } from "react";
import "./Signup.css";
import { Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {userContext} from '../App'

function Signup() {
  const { emailid, setEmailid, setUser, user} = useContext(userContext)

  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [cpass, setCpass] = useState();
  const [error, setError] = useState();
  const [match, setMatch] = useState();

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
    if (pass === cpass) {
      setMatch(undefined)
      await axios
        .post("http://localhost:3001/signup", {
          email: email,
          password: pass,
        })
        .then((res) => {
          const status = res?.data.status;
          const message = res?.data.message;
          const userid = res?.data.userid;
          const email = res?.data.email;
          console.log(status);
          if (status === "success") {
            setEmailid(email)
            setUser(userid)
            // console.log(emailid, user)
            navigate("/", { replace: true });
          } else {
            setError(message);
          }
        });
    } else {
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
          <Button onClick={signup} variant="contained">
            signup
          </Button>
        </div>
        <span>
          already have an account? <a href="/login">login</a>{" "}
        </span>
      </div>
    </div>
  );
}

export default Signup;
