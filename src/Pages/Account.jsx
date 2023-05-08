import React, { useContext, useEffect } from "react";
import Navbar from "../Components/Navbar";
import "./Account.css";
import { useNavigate } from "react-router-dom";
import {userContext} from '../App'
import Cookies from "universal-cookie";
import axios from "axios";

function Account() {
  const cookies = new Cookies();
  const navigate = useNavigate()
  const { emailid, setEmailid, setUser, user} = useContext(userContext)

  useEffect(() => {
    const verifyToken = async () => {
      const token = cookies.get("token");
      if (token) {
        const { data } = await axios.post("https://confessionity-node-sem-6-p.onrender.com/verifyToken", {
          token: token,
        });
        if (data) {
          // console.log(data);
          setEmailid(data?.email);
          setUser(data?.userid);
        }
      }
      console.log(token)
    };
    console.log("email",emailid)
    verifyToken();
    if(!emailid){
      navigate('/login', {replace:true})
    }
  }, [])
  
  return (
    <>
      <Navbar />
{      console.log({user})}
      <div className="container">
        <div className="left-userid">username: {user}</div>
        <div className="right-email">email: {emailid}</div>
      </div>
      <div className="hero-text"><span>your <span className="anonymity">anonymity</span>, our responsibility</span></div>
    </>
  );
}

export default Account;
