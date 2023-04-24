import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { Button } from "@mui/material";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";

function Home() {
  const navigate = useNavigate();
  const { emailid, setEmailid, setUser, user } = useContext(userContext);
  const [posts, setPosts] = useState();
  const [comment, setComment] = useState();

  const handleDate = (dateee) => {
    const d = new Date(dateee);
    const date = d.toISOString().split("T")[0];
    const time = d.toTimeString().split(" ")[0];
    return `${date} ${time}`;
  };

  const sendComment = async (params) => {
    await axios.post("http://localhost:3001/comments", params);
  };

  useEffect(() => {
    const getdata = async () => {
      await axios
        .get("http://localhost:3001/")
        .then((res) => {
          setPosts(res.data);
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    getdata();
  }, []);

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  return (
    <>
      {/* {console.log(comment)} */}
      {/* {console.log(emailid, user)} */}
      <Navbar />
      <div className="home">
        {posts
          ?.slice(0)
          .reverse()
          .map((post) => {
            return (
              <div className="all-posts">
                <div className="post-info">
                  <span className="username">{post?.userid}</span>
                  <span className="time">{handleDate(post?.date)}</span>
                </div>
                <div className="post-content">{post?.content}</div>
                <div className="comment-main">
                  <div className="comment">
                    <input
                      onChange={handleComment}
                      value={comment}
                      className="comment-input"
                      type="text"
                      name="comment"
                      placeholder="write your comment here"
                    />
                    <div className="comment-btn">
                      <Button
                        onClick={async () => {
                          sendComment({
                            id: post?._id,
                            comment: comment,
                          });
                          navigate("/comment");
                        }}
                        variant="contained"
                      >
                        <SendIcon />
                      </Button>
                    </div>
                    <div className="comment-btn">
                      <Button
                        onClick={() => {
                          const url = `/comment/${post?._id}`
                          navigate(url)
                        }}
                        variant="contained"
                      >
                        comments
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Home;
