import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import "./Group.css";
import { Button } from "@mui/material";
import { userContext } from "../App";

function Group() {
  const { emailid, setEmailid, setUser, user } = useContext(userContext);

  const [grpPost, setGrpPost] = useState();
  const [flag, setFlag] = useState(false);
  const [grpDetails, setGrpDetails] = useState();
  const params = useParams();
  const id = params.id;
  console.log(id);
  // console.log(id)
  useEffect(() => {
    const getDetails = async () => {
      await axios.get(`http://localhost:3001/group?id=${id}`).then((res) => {
        setGrpDetails(res.data);
        console.log(res.data);
      });
    };
    getDetails();
  }, [flag]);

  const handleGrpPost = async () => {
    const data = await axios.post('http://localhost:3001/grp-post',{
        admin: user,
        id:id,
        content:grpPost
    })
    if(data){
        alert("posted successfully")
    }
    setGrpPost("")
    setFlag(!flag)
  };
  const handleGrpInput = (e) => {
    setGrpPost(e.target.value)
  };

  return (
    <>
      <Navbar />
      <div className="grp-container">
        <div className="sin-grp-name">{grpDetails?.name}</div>
        <div className="grp-post-input">
          <input type="text" value={grpPost} onChange={handleGrpInput} placeholder="write your post here..." />{" "}
          <Button onClick={handleGrpPost} variant="contained">
            Post
          </Button>
        </div>
        <div className="grp-posts">
          {grpDetails?.posts?.slice(0).reverse().map((post) => {
            return (
              <div className="grp-all-posts">
                <div className="grp-post">
                  <div className="post-info">
                    <span className="username">{post?.username}</span>
                    <span className="time">{post?.date}</span>
                  </div>
                  <div className="post-content">{post?.content}</div>
                </div>
                <div className="comment-btn"></div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Group;
