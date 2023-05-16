import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import axios from "axios";
import "./Comment.css";
import SendIcon from "@mui/icons-material/Send";
import { Button, CircularProgress } from "@mui/material";
import { BASE_URL } from "../utility/baseUrl";
import { userContext } from "../App";
import Cookies from "universal-cookie";

function Comment() {
  const cookies = new Cookies();
  const { emailid, setEmailid, setUser, user } = useContext(userContext);
  const params = useParams();
  const id = params.id;
  const [post, setPost] = useState();
  const [comment, setComment] = useState();
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDate = (dateee) => {
    const d = new Date(dateee);
    const date = d.toISOString().split("T")[0];
    const time = d.toTimeString().split(" ")[0];
    return `${date} ${time}`;
  };

  const sendComment = async (params) => {
    setComment("");
    await axios.post(`${BASE_URL}/comments`, params);
  };

  useEffect(() => {
    const getComments = async () => {
      await axios
        .get(`${BASE_URL}/post-details?id=${id}`)
        .then((res) => setPost(res.data));
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
    getComments();
  }, [sending]);

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="progress"></div>

      <div className="container-comment">
        <div className="all-posts">
          <div className="post-info">
            <span className="username">{post?.userid}</span>
            {post ? <span className="time">{handleDate(post?.date)}</span> : ""}
          </div>
          <div className="post-content">{post?.content}</div>
        </div>
        <div className="comment-main">
          {emailid ? (
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
                    setLoading(true);
                    if (comment.trim() != 0) {
                      const encodedParams = new URLSearchParams();
                      encodedParams.set("text", comment);

                      const options = {
                        method: "POST",
                        url: "https://text-sentiment.p.rapidapi.com/analyze",
                        headers: {
                          "content-type": "application/x-www-form-urlencoded",
                          "X-RapidAPI-Key":
                            "28c02bb353msh2998e70e582daf6p1fc5a4jsnac03ff4e2649",
                          "X-RapidAPI-Host": "text-sentiment.p.rapidapi.com",
                        },
                        data: encodedParams,
                      };

                      try {
                        const response = await axios.request(options);
                        const negs = response?.data?.neg_percent.split("%")[0];
                        const neg = parseInt(negs);
                        if (neg < 50) {
                          sendComment({
                            id: post?._id,
                            comment: comment,
                          });
                          setSending(!sending);
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
                  }}
                  variant="contained"
                >
                  <SendIcon />
                </Button>
              </div>
            </div>
          ) : (
            ""
          )}
          {console.log(sending)}
        </div>
        <div className="comments-post">
          <span className="comment-hero">comments...</span>
          {!post ? (
            <div className="preloading">
              <CircularProgress />
              <div className="preloader-text">
              shhhhhh! Its loading
            </div>
            </div>
          ) : (
            ""
          )}
          {post?.comments
            ?.slice(0)
            .reverse()
            .map((comment) => {
              return <div className="single-comment">{comment}</div>;
            })}
        </div>
      </div>
    </>
  );
}

export default Comment;
