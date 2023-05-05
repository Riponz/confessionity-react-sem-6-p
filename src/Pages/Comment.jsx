import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import axios from "axios";
import "./Comment.css";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";

function Comment() {
  const params = useParams();
  const id = params.id;
  const [post, setPost] = useState();
  const [comment, setComment] = useState();
  const [sending, setSending] = useState(false);

  const handleDate = (dateee) => {
    const d = new Date(dateee);
    const date = d.toISOString().split("T")[0];
    const time = d.toTimeString().split(" ")[0];
    return `${date} ${time}`;
  };

  const sendComment = async (params) => {
    setComment("");
    await axios.post("http://localhost:3001/comments", params);
  };

  useEffect(() => {
    const getComments = async () => {
      await axios
        .get(`http://localhost:3001/post-details?id=${id}`)
        .then((res) => setPost(res.data));
    };
    getComments();
  }, [sending]);

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  return (
    <>
      <Navbar />
      {console.log(post?.comments)}

      <div className="container-comment">
        <div className="all-posts">
          <div className="post-info">
            <span className="username">{post?.userid}</span>
            <span className="time">{post?.date}</span>
          </div>
          <div className="post-content">{post?.content}</div>
        </div>
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
                      } else{
                        alert("due to use of negetive comments, we cannot post.")
                      }
                    } catch (error) {
                      alert("there was an error. Please try again.")
                    }
                  }
                }}
                variant="contained"
              >
                <SendIcon />
              </Button>
            </div>
          </div>
          {console.log(sending)}
        </div>
        <div className="comments-post">
          <span className="comment-hero">comments...</span>
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
