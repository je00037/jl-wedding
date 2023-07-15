import React, { FC } from "react";
import "./FAQs.css";

type FAQ = {
  question: string;
  answer: string;
};

interface FAQsProps {
  faqs: FAQ[];
}

export const FAQs: FC<FAQsProps> = ({ faqs }) => {
  return (
    <div className="faq-container">
      {faqs.map((faq) => (
        <div className="faq-item">
          <p className="faq-question">{faq.question}</p>
          <p className="faq-answer">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
};
