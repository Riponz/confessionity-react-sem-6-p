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
    setComment("")
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
                  sendComment({
                    id: post?._id,
                    comment: comment,
                  });
                  setSending(!sending)
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
