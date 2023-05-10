import React, { useState, useContext, useEffect } from "react";
import "./Post.css";
import { Button, CircularProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userContext } from "../App";
import Cookies from "universal-cookie";
import { BASE_URL } from "../utility/baseUrl";

function Post() {
  const cookies = new Cookies();
  const { emailid, setErrorText, setEmailid, setUser, user } =
    useContext(userContext);

  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = cookies.get("token");
      console.log(token);
      if (token) {
        const { data } = await axios.post(`${BASE_URL}/verifyToken`, {
          token: token,
        });
        if (data) {
          setEmailid(data?.email);
          setUser(data?.userid);
        }
      } else {
        setErrorText("login to continue");
        navigate("/login", { replace: true });
      }
    };
    verifyToken();
  }, []);

  const updatecontent = (e) => {
    setContent(e.target.value);
  };

  const postData = async () => {
    setLoading(true);
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
            .post(`${BASE_URL}/post`, {
              postContent: content,
              email: emailid,
              userid: user,
            })
            .then(function (response) {
              setLoading(false);
            })
            .catch(function (error) {
              // console.log(error);
            });
          alert("Posted Successfull");
          setContent("");
          navigate("/");
        } else {
          setLoading(false);
          alert("due to use of negetive comments, we cannot post.");
        }
      } catch (error) {
        setLoading(false);
        alert("there was a error. Please try again");
      }
    } else {
      setLoading(false);
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
          {loading ? (
            <CircularProgress />
          ) : (
            <ThemeProvider theme={theme}>
              <Button onClick={postData} color="violet" variant="contained">
                post
              </Button>
            </ThemeProvider>
          )}
        </div>
      </div>
    </>
  );
}

export default Post;

// const [loading, setLoading] = useState(false);
// setLoading(true)
// setLoading(false);
// {loading ? (
//   <CircularProgress />
// ) : ("")}
