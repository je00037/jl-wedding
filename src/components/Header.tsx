import React, { FC } from "react";
import { animated, useSpring } from "@react-spring/web";
import sunflower from "../img/sunflower.png";
import "./Header.css";
import { fadeInTopConfig } from "../animation-config";

const navItems = [
  {
    title: "Venue",
    linkID: "venue",
  },
  {
    title: "Schedule",
    linkID: "order",
  },
  {
    title: "Accommodation",
    linkID: "accom",
  },
  {
    title: "Sunflower",
  },
  {
    title: "Travel",
    linkID: "travel",
  },
  {
    title: "Song Request",
    linkID: "song",
  },
  {
    title: "Contact",
    linkID: "contact",
  },
];

interface HeaderProps {
  clickHandler: () => void;
  authed: boolean;
}

export const Header: FC<HeaderProps> = ({ clickHandler, authed }) => {
  const fadeIn = useSpring(fadeInTopConfig);

  return (
    <animated.header style={fadeIn}>
      <nav className="navbar">
        {navItems.map(({ title, linkID }, index) => {
          return index === 3 ? (
            <div className="scale" onClick={clickHandler}>
              <img src={sunflower} className="sunflower" alt="logo" />
            </div>
          ) : (
            <a href={authed ? `#${linkID}` : "#locked"} className="hide">
              <h2>{title}</h2>
            </a>
          );
        })}
      </nav>
    </animated.header>
  );
};
