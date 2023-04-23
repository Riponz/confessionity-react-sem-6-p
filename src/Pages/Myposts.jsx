import React, { useEffect, useState, useContext } from "react";
import "./Myposts.css";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { userContext } from "../App";
import { useNavigate } from "react-router-dom";

function Myposts() {
  const navigate = useNavigate();

  const { emailid, setErrorText , setEmailid, setUser, user } = useContext(userContext);
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
    if (!emailid) {
      setErrorText("login to continue")
      navigate("/login", { replace: true });
    }
    const getdata = async () => {
      await axios
        .get(`http://localhost:3001/my-post?email=${emailid}`)
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
      <div className="myposts">
        {myPosts
          ?.slice(0)
          .reverse()
          .map((post) => {
            return (
              <div key={post?._id} className="all-posts">
                <div className="post-info">
                  <span className="username">{post?.userid}</span>
                  <span className="email-mye">{post?.email}</span>
                  <span className="time">{handleDate(post?.date)}</span>
                </div>
                <div className="post-content">{post?.content}</div>
                <div className="post-delete">
                  <ThemeProvider theme={theme}>
                    <Button
                      onClick={() => {
                        axios.delete("http://localhost:3001/delete-post", {
                          data: { postId: post._id },
                        });
                        setEffect(!effect);
                      }}
                      variant="contained"
                    >
                      Delete
                    </Button>
                  </ThemeProvider>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Myposts;
