import React, { FC } from "react";
import "./Polaroid.css";

interface PolaroidProps {
  image: string;
  caption: string;
  index: number;
  largeImg?: boolean;
  skew?: boolean;
}

export const Polaroid: FC<PolaroidProps> = ({
  image,
  caption,
  index,
  largeImg = false,
  skew = true,
}) => {
  return (
    <div
      className={`image-container ${
        skew ? (index % 2 === 0 ? "skew-left" : "skew-right") : null
      }`}
    >
      <img
        src={image}
        alt={`polaroid-${caption}`}
        className={largeImg ? "large-image" : "image"}
      />
      <p className="caption">{caption}</p>
    </div>
  );
};
