import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Account from "./Pages/Account";
import Home from "./Pages/Home";
import Myposts from "./Pages/Myposts";
import Post from "./Pages/Post";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

function App() {
  return (
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
  );
}

export default App;
