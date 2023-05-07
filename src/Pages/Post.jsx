import React, { useState, useContext, useEffect } from "react";
import "./Post.css";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";

function Post() {
  const { emailid, setErrorText, setEmailid, setUser, user } =
    useContext(userContext);

  const navigate = useNavigate();
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!emailid) {
      setErrorText("login to continue");
      navigate("/login", { replace: true });
    }
  }, []);

  const updatecontent = (e) => {
    setContent(e.target.value);
  };

  const postData = async () => {
    if (content.trim() != "") {
      const encodedParams = new URLSearchParams();
      encodedParams.set("text", content.trim());

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
        // if(response.data?.)
        const negs = response?.data?.neg_percent.split("%")[0];
        const neg = parseInt(negs);

        if (neg < 50) {
          console.log(neg);
          await axios
            .post("https://confessionity-node-sem-6-p.onrender.com/post", {
              postContent: content,
              email: emailid,
              userid: user,
            })
            .then(function (response) {
              // console.log(response);
            })
            .catch(function (error) {
              // console.log(error);
            });

          alert("Posted Successfull");
          setContent("");
          navigate("/");
        } else {
          alert("due to use of negetive comments, we cannot post.");
        }
      } catch (error) {
        alert("there was a error. Please try again");
      }
    } else {
      alert("write something before you post!!!");
    }
  };

  const theme = createTheme({
    palette: {
      violet: {
        main: "#B2A4FF",
      },
    },
  });

  return (
    <>
      <Navbar />
      <div className="post">
        <div className="post-create">
          <textarea
            value={content}
            onChange={updatecontent}
            className="textarea"
            id="post"
            cols="60"
            rows="15"
            placeholder="write your post here..."
          ></textarea>
        </div>
        <div className="post-btn">
          <ThemeProvider theme={theme}>
            <Button onClick={postData} color="violet" variant="contained">
              Post
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </>
  );
}

export default Post;
