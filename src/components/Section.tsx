import React, { FC, ReactNode } from "react";

interface SectionProps {
  title?: string;
  id?: string;
  children?: ReactNode;
}

export const Section: FC<SectionProps> = ({ title, id, children }) => {
  return (
    <section>
      {title && <h1 id={id}>{title}</h1>}
      {children}
    </section>
  );
};
