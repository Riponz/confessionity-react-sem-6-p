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
      await axios.get("http://localhost:3001/groups").then((res) => {
        setGroups(res.data);
      });
    };
    getgroups();
  }, []);

  // const handleFilter = () => {
  //   console.log(search)
  //   return groups?.filter((grp) => {
  //     console.log(grp?.name)
  //     grp?.name.includes('b')
  //   });
  // };

  // console.log(groups)
  // console.log(handleFilter())

  const handleCreateGrp = () => {
    navigate("/groups/create");
  };
  return (
    <>
      <Navbar />
      {/* <input type="text" onChange={(e) => setSearch(e.target.value)} /> */}
      <div className="create-grp">
        <Button onClick={handleCreateGrp} variant="outlined">
          create
        </Button>
      </div>
      {/* {console.log(groups)} */}
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
