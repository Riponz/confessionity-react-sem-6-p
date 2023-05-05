import React, { useContext } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
import { Button, ThemeProvider, createTheme } from "@mui/material";
import Cookies from "universal-cookie";

function Navbar() {
  const cookies = new Cookies();

  const navigate = useNavigate();
  const theme = createTheme({
    palette: {
      violet: {
        main: "#6f5fc9",
      },
    },
  });

  const { emailid, setEmailid, setUser, user } = useContext(userContext);

  const handleLogout = (e) => {
    if (e.target.outerText === "Login") {
      navigate("/login", { replace: true });
    }
    setEmailid(undefined);
    setUser(undefined);
    cookies.remove("token");
    navigate("/login", { replace: true });
  };
  return (
    <div className="navbar">
      <div className="navbar-logo">Confessionity</div>
      <div className="navbar-menu">
        {emailid ? (
          <div className="menu-ele">
            <NavLink style={{ color: "black" }} to="/">
              Home
            </NavLink>
          </div>
        ) : (
          ""
        )}
        {emailid ? (
          <div className="menu-ele">
            <NavLink style={{ color: "black" }} to="/post">
              Post
            </NavLink>
          </div>
        ) : (
          ""
        )}
        {emailid ? (
          <div className="menu-ele">
            <NavLink style={{ color: "black" }} to="/my-posts">
              My Posts
            </NavLink>
          </div>
        ) : (
          ""
        )}
        {
          <div className="menu-ele">
            <NavLink style={{ color: "black" }} to="/groups">
              Groups
            </NavLink>
          </div>
        }
        {emailid ? (
          <div className="menu-ele">
            <NavLink style={{ color: "black" }} to="/accounts">
              Account
            </NavLink>
          </div>
        ) : (
          ""
        )}
        <ThemeProvider theme={theme}>
          <Button onClick={handleLogout} color="violet" variant="contained">
            {!emailid ? "Login" : "Logout"}
          </Button>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default Navbar;
