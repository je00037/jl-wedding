import React, { FC } from "react";
import "./Divider.css";
import sunflower from "../img/sunflower.png";

export const Divider: FC = () => {
  return (
    <div className="container">
      <div className="line" />
      <img
        src={sunflower}
        alt="sunflower divider"
        className="sunflower-divider"
      />
      <div className="line" />
    </div>
  );
};
