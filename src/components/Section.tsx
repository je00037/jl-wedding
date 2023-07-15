import React, { FC, ReactNode } from "react";
import "./Section.css";

interface SectionProps {
  title?: string;
  id?: string;
  children?: ReactNode;
}

export const Section: FC<SectionProps> = ({ title, id, children }) => {
  return (
    <section className="section-container">
      {title && <h1 id={id}>{title}</h1>}
      <div className="section-content">{children}</div>
    </section>
  );
};
