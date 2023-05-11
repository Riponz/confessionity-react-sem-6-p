import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Button, CircularProgress, Input } from "@mui/material";
import "./Groups.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utility/baseUrl";
import Cookies from "universal-cookie";
import { userContext } from "../App";


function Groups() {
  const { emailid, setEmailid, setUser, user } = useContext(userContext);
  const cookies = new Cookies()
  const navigate = useNavigate();
  const [groups, setGroups] = useState();

  useEffect(() => {
    
    const getgroups = async () => {
      await axios
        .get(`${BASE_URL}/groups`)
        .then((res) => {
          setGroups(res.data);
        });
    };
    const verifyToken = async () => {
      const token = cookies.get("token");
      if (token) {
        const { data } = await axios.post(`${BASE_URL}/verifyToken`, {
          token: token,
        });
        if (data) {
          // console.log(data);
          setEmailid(data?.email);
          setUser(data?.userid);
        }
      }
    };
    verifyToken();
    getgroups();
  }, []);

  const handleCreateGrp = () => {
    navigate("/groups/create");
  };
  return (
    <>
      <Navbar />
      <div className="progress">{!groups? (
          <div className="preloader">
            <CircularProgress/>
            <div className="preloader-text">
            shhhhh! its loading
            </div>
          </div>
        ):""}</div>
      <div className="create-grp">
        <Button onClick={handleCreateGrp} variant="outlined">
          create
        </Button>
      </div>
      <div className="all-grps">
        {groups?.map((group) => {
          return (
            <div
              onClick={() => {
                const url = `/groups/${group?._id}`;
                navigate(url);
              }}
              className="grp-info"
            >
              <div className="grp-name">{group?.name}</div>
              <div className="grp-bio">{group?.bio}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Groups;
