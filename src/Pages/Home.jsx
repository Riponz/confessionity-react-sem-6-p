import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { Button, CircularProgress, Fab } from "@mui/material";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { BASE_URL } from "../utility/baseUrl";

function Home() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const { emailid, setEmailid, setUser, user } = useContext(userContext);
  const [posts, setPosts] = useState();
  const [comment, setComment] = useState();
  const [loading, setLoading] = useState(false);

  const handleDate = (dateee) => {
    const d = new Date(dateee);
    const date = d.toISOString().split("T")[0];
    const time = d.toTimeString().split(" ")[0];
    return `${date} ${time}`;
  };

  useEffect(() => {
    const getdata = async () => {
      await axios
        .get(`${BASE_URL}/`)
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
        const { data } = await axios.post(`${BASE_URL}/verifyToken`, {
          token: token,
        });
        if (data) {
          setEmailid(data?.email);
          setUser(data?.userid);
        }
      }
    };
    verifyToken();
    getdata();
  }, []);

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const sendComment = async (params) => {
    setComment("");
    await axios.post(`${BASE_URL}/comments`, params);
  };

  return (
    <>
      <Navbar />
      <div className="progress">
        {!posts ? (
          <div className="preloader">
            <CircularProgress className="blue" />
            <div className="preloader-text">shhhhhh! Its loading</div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="home">
        {posts
          ?.slice(0)
          .reverse()
          .map((post) => {
            return (
              <div className="home-all-posts">
                <div
                  key={post?._id}
                  className="home-post"
                  onClick={() => {
                    const url = `/comment/${post?._id}`;
                    navigate(url);
                  }}
                >
                  <div className="post-info">
                    <span className="username">{post?.userid}</span>
                    <span className="time">{handleDate(post?.date)}</span>
                  </div>
                  <div className="post-content">{post?.content}</div>
                </div>
                <div className="quick-comment">
                  <div className="hero-comment">comments...</div>
                  {user ? (
                    <div className="qc">
                      <input
                        type="text"
                        placeholder="write your comment..."
                        className="qc-input"
                        onChange={handleComment}
                      />
                      <Button
                        variant="contained"
                        onClick={async () => {
                          setLoading(true);
                          if (comment.trim() != 0) {
                            const encodedParams = new URLSearchParams();
                            encodedParams.set("text", comment);

                            const options = {
                              method: "POST",
                              url: "https://text-sentiment.p.rapidapi.com/analyze",
                              headers: {
                                "content-type":
                                  "application/x-www-form-urlencoded",
                                "X-RapidAPI-Key":
                                  "28c02bb353msh2998e70e582daf6p1fc5a4jsnac03ff4e2649",
                                "X-RapidAPI-Host":
                                  "text-sentiment.p.rapidapi.com",
                              },
                              data: encodedParams,
                            };

                            try {
                              const response = await axios.request(options);
                              const negs =
                                response?.data?.neg_percent.split("%")[0];
                              const neg = parseInt(negs);
                              if (neg < 50) {
                                sendComment({
                                  id: post?._id,
                                  comment: comment,
                                });
                              } else {
                                alert(
                                  "due to use of negetive comments, we cannot post."
                                );
                              }
                            } catch (error) {
                              alert("there was an error. Please try again.");
                            }
                            setLoading(false);
                          }
                          navigate(`/comment/${post?._id}`);
                        }}
                      >
                        send
                      </Button>
                    </div>
                  ) : (
                    ""
                  )}

                  <div className="latest-comment">
                    {post?.comments[0] ? (
                      <div className="first-comment">
                        <div className="qc-comment">
                          {post?.comments?.slice(-1)}
                        </div>
                        <div
                          className="show-more-comments"
                          onClick={() => {
                            const url = `/comment/${post?._id}`;
                            navigate(url);
                          }}
                        >
                          <u>
                            <i>more...</i>
                          </u>
                        </div>
                      </div>
                    ) : (
                      "no comments yet..."
                    )}
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
