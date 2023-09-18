import React, { FC } from "react";
import "./Polaroid.css";

interface PolaroidProps {
  image: string;
  caption: string;
  index?: number;
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
  if (index === undefined) {
    return null;
  }
  return (
    <div
      className={`image-container ${
        skew ? (index % 2 === 0 ? "skew-left" : "skew-right") : null
      } ${caption === "New York City, 2022" ? "hearts" : null}`}
    >
      <img
        src={image}
        alt={`polaroid-${caption}`}
        className={largeImg ? "large-image" : "image"}
      />
      <p
        className="caption"
        style={
          caption === "New York City, 2022"
            ? { color: "darkred", fontWeight: "bold" }
            : {}
        }
      >
        {caption}
      </p>
    </div>
  );
};
