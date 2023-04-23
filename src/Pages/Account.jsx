import React, { useContext, useEffect } from "react";
import Navbar from "../Components/Navbar";
import "./Account.css";
import { useNavigate } from "react-router-dom";
import {userContext} from '../App'

function Account() {
  const navigate = useNavigate()
  const { emailid, setEmailid, setUser, user} = useContext(userContext)

  useEffect(() => {
    if(!emailid){
      navigate('/login', {replace:true})
    }
  }, [])
  
  return (
    <>
      <Navbar />
      <div className="container">
        <div className="left-userid">username: {user}</div>
        <div className="right-email">email: {emailid}</div>
      </div>
      <div className="hero-text"><span>your <span className="anonymity">anonymity</span>, our responsibility</span></div>
    </>
  );
}

export default Account;
