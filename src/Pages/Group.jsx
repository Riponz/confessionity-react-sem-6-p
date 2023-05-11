import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import "./Group.css";
import { Button, CircularProgress } from "@mui/material";
import { userContext } from "../App";
import { BASE_URL } from "../utility/baseUrl";
import { Lines } from "react-preloaders";

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
      await axios.get(`${BASE_URL}/group?id=${id}`).then((res) => {
        setGrpDetails(res.data);
        console.log(res.data);
      });
    };
    getDetails();
  }, [flag]);

  const handleGrpPost = async () => {
    setLoading(true);
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
          const data = await axios.post(`${BASE_URL}/grp-post`, {
            admin: user,
            id: id,
            content: grpPost,
          });
          if (data) {
            setLoading(false);
            alert("posted successfully");
          }
          setGrpPost("");
          setFlag(!flag);
        } else {
          setLoading(false);
          alert("due to use of negetive comments, we cannot post.");
        }
      } catch (error) {
        setLoading(false);
        alert("There was error. Please Try again.");
      }
      setLoading(false);
    }
  };
  const handleGrpInput = (e) => {
    setGrpPost(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="progress"></div>
      <div className="grp-container">
        <div className="sin-grp-name">{grpDetails?.name}</div>
        {emailid ? (
          <div className="grp-post-input">
            <input
              type="text"
              value={grpPost}
              onChange={handleGrpInput}
              placeholder="write your post here..."
            />
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

        {!grpDetails ? (
          <div className="preloader">
            <Lines color="#646cff" background="transparent" />
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
