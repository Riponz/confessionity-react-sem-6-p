import React from "react";
import "./Myposts.css";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../Components/Navbar";

function Myposts() {
  const theme = createTheme({
    palette: {
      delete: {
        main: "#F13E3E",
      },
    },
  });

  return (
    <>
    <Navbar/>
    <div className="myposts">
      <div className="all-posts">
        <div className="post-info">
          <span className="username">username</span>
          <span className="time">09:00</span>
        </div>
        <div className="post-content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, esse
          quibusdam molestias in ratione sequi reprehenderit cupiditate, tempore
          consectetur architecto, ducimus fuga accusantium sint. Molestias
          aperiam laudantium sapiente architecto aut tempore quo natus vel eius
          repellendus corporis porro ipsum inventore earum tempora voluptatem
          saepe neque, alias excepturi eveniet. Recusandae at eum non
          consequuntur id sit minus ipsum repellendus assumenda nulla, ipsam
          incidunt debitis ipsa inventore esse perferendis. Accusamus, porro.
          Harum consectetur perspiciatis ex ea nemo temporibus quaerat quisquam
          excepturi neque voluptatibus beatae fugiat recusandae, eum quia rerum,
          repellat, quidem incidunt. Accusamus corrupti ipsam ad illo deserunt
          voluptatibus exercitationem atque perspiciatis.
        </div>
        <div className="post-delete">
          <ThemeProvider theme={theme}>
            <Button variant="contained">
              Delete
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </div>
    </>
  );
}

export default Myposts;
