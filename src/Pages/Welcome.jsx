import React, { useEffect } from "react";
import "./Welcome.css";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();
  useEffect(() => {
  //   const delayGo = () => {
        
  //   }


  setTimeout(function() {
    navigate('/')
  }, 4000);
  }, []);

  return (
    <div className="welcome">
      <span className="welcome-span">lets confess!</span>
      <svg className="svg" viewBox="0 0 1000 400">
        <text id="mytext" x="50%" y="50%" text-anchor="middle" fill="none">
          confessionity
        </text>
        <use xlink:href="#mytext" class="copy copy1"></use>
        <use xlink:href="#mytext" class="copy copy2"></use>
      </svg>
    </div>
  );
}

export default Welcome;
