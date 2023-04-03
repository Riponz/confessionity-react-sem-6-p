import React from 'react'
import './Post.css'
import { Button } from '@mui/material'
import { createTheme, ThemeProvider,  } from '@mui/material/styles';
import Navbar from '../Components/Navbar';




function Post() {
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
        <textarea className='textarea' id="post" cols="120" rows="20" placeholder='write your post here...'></textarea>
        </div>
        <div className="post-btn">
        <ThemeProvider theme={theme}>
        <Button color="violet" variant="contained">Post</Button>
        </ThemeProvider>
        </div>
    </div>
    </>
  )
}

export default Post