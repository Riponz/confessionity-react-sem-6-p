import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import axios from "axios";

function Comment() {
  const params = useParams();
  const id = params.id;
  const [post, setPost] = useState();

  const handleDate = (dateee) => {
    const d = new Date(dateee);
    const date = d.toISOString().split("T")[0];
    const time = d.toTimeString().split(" ")[0];
    return `${date} ${time}`;
  };

  useEffect(() => {
    const getComments = async () => {
      await axios
        .get(`http://localhost:3001/post-details?id=${id}`)
        .then((res) => setPost(res.data));
    };
    getComments();
  }, []);

  return (
    <>
      <Navbar />
      <div className="all-posts">
        <div className="post-info">
          <span className="username">{post?.userid}</span>
          <span className="time">{post?.date}</span>
        </div>
        <div className="post-content">{post?.content}</div>
      </div>
    </>
  );
}

export default Comment;
