import React from "react";
import { ErrorMessage } from "formik";
import "./RSVPFormError.css";

interface RSVPFormErrorProps {
  name: string;
}

export const RSVPFormError = ({ name }: RSVPFormErrorProps) => {
  return (
    <ErrorMessage name={name}>
      {(msg) => <p className="rsvp-form-error-text">{msg}</p>}
    </ErrorMessage>
  );
};
