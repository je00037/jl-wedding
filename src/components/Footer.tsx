import React, { FC } from "react";
import "./Footer.css";
import stamp from "../img/stamp.webp";

export const Footer: FC = () => {
  return (
    <div className="footer-container">
      <img src={stamp} alt="lj stamp" className="stamp" />
      <p className="footer-text">Lucy &amp; Joe's Wedding, 2024</p>
    </div>
  );
};
