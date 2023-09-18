import React, { FC } from "react";
import "./LoadingDots.css";

export const LoadingDots: FC = () => {
  return (
    <div className="dot-container">
      <div className="loading-dot" />
      <div className="loading-dot delay-1" />
      <div className="loading-dot delay-2" />
    </div>
  );
};
