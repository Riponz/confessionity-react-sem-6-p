import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Account from "./Pages/Account";
import Home from "./Pages/Home";
import Myposts from "./Pages/Myposts";
import Post from "./Pages/Post";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import React, { createContext, useState } from "react";

export const userContext = React.createContext()

function App() {
  const [email, setEmail] = useState()
  const [userid, setUserid] = useState()
  const [error, setError] = useState()
  return (

    <userContext.Provider value={{ errorText:error, setErrorText:setError , emailid:email, user:userid , setUser:setUserid , setEmailid:setEmail }}>
    <div className="App">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/post/" element={<Post />} />
        <Route path="/my-posts/" element={<Myposts />} />
        <Route path="/accounts/" element={<Account />} />
      </Routes>
    </div>
    </userContext.Provider>
  );
}

export default App;
