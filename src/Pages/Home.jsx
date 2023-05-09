import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { Button, Fab } from "@mui/material";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import LinearProgress from '@mui/material/LinearProgress';


function Home() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const { emailid, setEmailid, setUser, user } = useContext(userContext);
  const [posts, setPosts] = useState();

  const handleDate = (dateee) => {
    const d = new Date(dateee);
    const date = d.toISOString().split("T")[0];
    const time = d.toTimeString().split(" ")[0];
    return `${date} ${time}`;
  };

  useEffect(() => {
    const getdata = async () => {
      await axios
        .get("https://confessionity-node-sem-6-p.onrender.com/")
        .then((res) => {
          setPosts(res.data);
          console.log(new Date(Date.now() + 2592000));

          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const verifyToken = async () => {
      const token = cookies.get("token");
      if (token) {
        const { data } = await axios.post("https://confessionity-node-sem-6-p.onrender.com/verifyToken", {
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
    getdata();
  }, []);

  return (
    <>
      <Navbar />
      <div className="progress">{!posts? <LinearProgress color="secondary" />:""}</div>
      <div className="home">
        {posts
          ?.slice(0)
          .reverse()
          .map((post) => {
            return (
              <div
                className="home-all-posts"
                onClick={() => {
                  const url = `/comment/${post?._id}`;
                  navigate(url);
                }}
              >
                <div className="home-post">
                  <div className="post-info">
                    <span className="username">{post?.userid}</span>
                    <span className="time">{handleDate(post?.date)}</span>
                  </div>
                  <div className="post-content">{post?.content}</div>
                </div>
                <div className="comment-btn">
                  <Button
                    onClick={() => {
                      const url = `/comment/${post?._id}`;
                      navigate(url);
                    }}
                    variant="contained"
                  >
                    comments
                  </Button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Home;
