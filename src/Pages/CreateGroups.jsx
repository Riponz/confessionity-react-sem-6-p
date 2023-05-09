import { useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import "./CreateGroups.css";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { userContext } from "../App";

function CreateGroups() {
  const navigate = useNavigate()
  const [name, setName] = useState();
  const [bio, setBio] = useState();
  const { emailid, setEmailid, setUser, user } = useContext(userContext);

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleBio = (e) => {
    setBio(e.target.value);
  };

  const handleCreate = async () => {
    const creategrp = await axios.post("http://localhost:3001/group", {
      name: name,
      bio: bio,
      user: user,
    });
    if(creategrp){
      navigate('/groups')
    }
  };

  return (
    <>
      <div className="grp-create">
        <div className="grp-form">
          <div className="grp-herotext">create group</div>
          <TextField
            onChange={handleName}
            type="text"
            margin="none"
            label="name"
            size="small"
            style={{
              marginTop: 20,
            }}
          />
          <TextField
            onChange={handleBio}
            type="text"
            margin="none"
            label="bio"
            size="small"
            style={{
              marginTop: 20,
            }}
          />
          <Button
            onClick={handleCreate}
            variant="contained"
            style={{
              marginTop: 25,
            }}
          >
            create
          </Button>
        </div>
        {/* {console.log(name, bio)} */}
      </div>
    </>
  );
}

export default CreateGroups;
