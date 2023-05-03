import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Button } from "@mui/material";
import "./Groups.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function Groups() {
  const navigate = useNavigate()
  const [groups, setGroups] = useState();

  useEffect(() => {
    const getgroups = async () => {
      await axios.get("http://localhost:3001/group").then((res) => {
        setGroups(res.data);
      });
    };
    getgroups();
  }, []);

  const handleCreateGrp =() =>{
    navigate('/groups/create')
  }
  return (
    <>
      <Navbar />
      <div className="create-grp">
        <Button onClick={handleCreateGrp} variant="outlined">create</Button>
      </div>
      {/* {console.log(groups)} */}
      <div className="all-grps">
      {groups?.map((group) => {
        return (
          <div className="grp-info">
            {/* {console.log(group?.name)}
            {console.log(group?.bio)} */}
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
