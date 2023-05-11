import React, { useEffect, useState, useContext } from "react";
import "./Myposts.css";
import { Button, CircularProgress } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { BASE_URL } from "../utility/baseUrl";


function Myposts() {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const { emailid, setErrorText, setEmailid, setUser, user } =
    useContext(userContext);
  const email = "random";
  const [myPosts, setMyPosts] = useState();
  const [effect, setEffect] = useState(true);

  const handleDate = (dateee) => {
    const d = new Date(dateee);
    const date = d.toISOString().split("T")[0];
    const time = d.toTimeString().split(" ")[0];
    return `${date} ${time}`;
  };

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
    const getdata = async () => {
      await axios
        .get(`${BASE_URL}/my-post?email=${emailid}`)
        .then((res) => {
          setMyPosts(res.data);
          console.log(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };

    getdata();
  }, [effect]);

  const theme = createTheme({
    palette: {
      delete: {
        main: "#F13E3E",
      },
    },
  });

  return (
    <>
      <Navbar />
      <div className="progress">{!myPosts? (
          <div className="preloader">
            <CircularProgress/>
            <div className="preloader-text">
              shhhhh! its loading
            </div>
          </div>
        ):""}</div>
      <div className="myposts">
        {myPosts
          ?.slice(0)
          .reverse()
          .map((post) => {
            return (
              <div key={post?._id} className="all-posts">
                <div className="post-info">
                  <span className="username">{post?.userid}</span>
                  {/* <span className="email-mye">{post?.email}</span> */}
                  <span className="time">{handleDate(post?.date)}</span>
                </div>
                <div className="post-content">{post?.content}</div>
                <div className="post-delete">
                  <ThemeProvider theme={theme}>
                    <Button
                      onClick={() => {
                        axios.delete(`${BASE_URL}/delete-post`, {
                          data: { postId: post._id },
                        });
                        alert("post deleted")
                        setEffect(!effect);
                      }}
                      variant="contained"
                    >
                      Delete
                    </Button>
                  </ThemeProvider>
                </div>
                <div className="my-comments-post">
                  <span className="comment-hero">comments...</span>
                  {post?.comments
                    ?.slice(0)
                    .reverse()
                    .map((comment) => {
                      return <div className="single-my-comment">{comment}</div>;
                    })}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Myposts;
