import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import "./Group.css";
import { Button, CircularProgress } from "@mui/material";
import { userContext } from "../App";
import LinearProgress from "@mui/material/LinearProgress";

function Group() {
  const { emailid, setEmailid, setUser, user } = useContext(userContext);

  const [grpPost, setGrpPost] = useState();
  const [flag, setFlag] = useState(false);
  const [grpDetails, setGrpDetails] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    const getDetails = async () => {
      await axios
        .get(`https://confessionity-node-sem-6-p.onrender.com/group?id=${id}`)
        .then((res) => {
          setGrpDetails(res.data);
          console.log(res.data);
        });
    };
    getDetails();
  }, [flag]);

  const handleGrpPost = async () => {
    setLoading(true)
    if (grpPost.trim != "") {
      const encodedParams = new URLSearchParams();
      encodedParams.set("text", grpPost);

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
          const data = await axios.post(
            "https://confessionity-node-sem-6-p.onrender.com/grp-post",
            {
              admin: user,
              id: id,
              content: grpPost,
            }
          );
          if (data) {
            alert("posted successfully");
          }
          setGrpPost("");
          setFlag(!flag);
        } else {
          alert("due to use of negetive comments, we cannot post.");
        }
      } catch (error) {
        alert("There was error. Please Try again.");
      }
      setLoading(false)
    }
  };
  const handleGrpInput = (e) => {
    setGrpPost(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="progress">
        {!grpDetails ? <LinearProgress color="secondary" /> : ""}
      </div>
      <div className="grp-container">
        <div className="sin-grp-name">{grpDetails?.name}</div>
        {emailid ? (
          <div className="grp-post-input">
            <input
              type="text"
              value={grpPost}
              onChange={handleGrpInput}
              placeholder="write your post here..."
            />{" "}
            {loading ? (
              <CircularProgress />
            ) : (
              <Button onClick={handleGrpPost} variant="contained">
                Post
              </Button>
            )}
          </div>
        ) : (
          ""
        )}

        <div className="grp-posts">
          {grpDetails?.posts
            ?.slice(0)
            .reverse()
            .map((post) => {
              return (
                <div className="grp-all-posts">
                  <div className="grp-post">
                    <div className="post-info">
                      <span className="username">{post?.username}</span>
                      <span className="time">{post?.date}</span>
                    </div>
                    <div className="post-content">{post?.content}</div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Group;
