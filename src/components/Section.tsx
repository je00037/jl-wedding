import React, { FC, ReactNode } from "react";
import "./Section.css";

interface SectionProps {
  title?: string;
  subtitle?: string;
  id?: string;
  children?: ReactNode;
}

export const Section: FC<SectionProps> = ({
  title,
  subtitle,
  id,
  children,
}) => {
  return (
    <section className="section-container">
      {title && (
        <h1 id={id} className="section-heading">
          {title}
        </h1>
      )}
      {subtitle && <p>{subtitle}</p>}
      <div className="section-content">{children}</div>
    </section>
  );
};
