import React, { FC, ReactNode } from "react";
import "./Carousel.css";

interface CarouselProps {
  children?: ReactNode;
}

const Carousel: FC<CarouselProps> = ({ children }) => (
  <div className="carousel">{children}</div>
);

export default Carousel;
