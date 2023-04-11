import React, { FC } from "react";
import "./Polaroid.css";

interface PolaroidProps {
  image: string;
  caption: string;
  index: number;
}

const Polaroid: FC<PolaroidProps> = ({ image, caption, index }) => {
  return (
    <div
      className={`image-container ${
        index % 2 === 0 ? "skew-left" : "skew-right"
      }`}
    >
      <img src={image} alt={`polaroid-${caption}`} className="image" />
      <p className="caption">{caption}</p>
    </div>
  );
};

export default Polaroid;
