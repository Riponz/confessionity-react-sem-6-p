import React, { useState, useContext, useEffect } from 'react'
import './Post.css'
import { Button } from '@mui/material'
import { createTheme, ThemeProvider,  } from '@mui/material/styles';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {userContext} from '../App'




function Post() {
  
  const { emailid, setErrorText, setEmailid, setUser, user} = useContext(userContext)

  const navigate = useNavigate();
  const [content, setContent] = useState("")


  useEffect(() => {
    if(!emailid){
      setErrorText("login to continue")
      navigate('/login', {replace:true})
    }
  }, [])
  
  const updatecontent = (e) =>{
    setContent(e.target.value)
    console.log(content)
  }

  const postData = async () =>{
    await axios.post('http://localhost:3001/post', {
      postContent: content,
      email: emailid,
      userid: user
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    alert("Posted Successfull")
    setContent("");
    navigate('/')
  }


    const theme = createTheme({
        palette: {
          violet: {
            main: '#B2A4FF',
          },
        },
      });

  return (
    <>
    <Navbar/>
    <div className='post'>
        <div className="post-create">
        <textarea value={content} onChange={updatecontent} className='textarea' id="post" cols="60" rows="15" placeholder='write your post here...'></textarea>
        </div>
        <div className="post-btn">
        <ThemeProvider theme={theme}>
        <Button onClick={postData} color="violet" variant="contained">Post</Button>
        </ThemeProvider>
        </div>
    </div>
    </>
  )
}

export default Post