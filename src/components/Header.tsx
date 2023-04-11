import React, { FC } from "react";
import { animated, useSpring } from "@react-spring/web";
import sunflower from "../img/sunflower.png";
import "./Header.css";

interface HeaderProps {
  clickHandler: () => void;
}

const Header: FC<HeaderProps> = ({ clickHandler }) => {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 300,
  });

  return (
    <animated.header style={fadeIn}>
      <nav className="navbar">
        <a href="#venue" className="hide">
          <h2>Venue</h2>
        </a>
        <a href="#order" className="hide">
          <h2>Schedule</h2>
        </a>
        <a href="#accom" className="hide">
          <h2>Accommodation</h2>
        </a>
        <div className="scale" onClick={clickHandler}>
          <img src={sunflower} className="sunflower" alt="logo" />
        </div>
        <a href="#travel" className="hide">
          <h2>Travel</h2>
        </a>
        <a href="#song" className="hide">
          <h2>Song Request</h2>
        </a>
        <a href="#contact" className="hide">
          <h2>Contact</h2>
        </a>
      </nav>
    </animated.header>
  );
};

export default Header;
