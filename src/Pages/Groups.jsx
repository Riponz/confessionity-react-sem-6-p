import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Button, Input } from "@mui/material";
import "./Groups.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Groups() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState();
  const [search, setSearch] = useState();

  useEffect(() => {
    const getgroups = async () => {
      await axios
        .get("https://confessionity-node-sem-6-p.onrender.com/groups")
        .then((res) => {
          setGroups(res.data);
        });
    };
    getgroups();
  }, []);

  const handleCreateGrp = () => {
    navigate("/groups/create");
  };
  return (
    <>
      <Navbar />
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
