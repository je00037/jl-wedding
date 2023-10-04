import React from "react";
import { Formik, Field, Form } from "formik";
import { RSVPFormError } from "./RSVPFormError";
import "./RSVPForm.css";

// guest 1, guest 2, dietary, song

interface Values {
  name: string;
}

const validate = (values: Values) => {
  const errors: any = {};
  if (values.name.length > 30) {
    errors.name =
      "That's a long name! A bit too long. What do your friends call you?";
  }
  if (values.name.length < 4) {
    errors.name = "That doesn't look long enough to be a name!";
  }
  return errors;
};

export const RSVPForm = () => {
  return (
    <Formik
      validate={validate}
      initialValues={{ name: "", name2: "", dietary: "", song: "" }}
      onSubmit={(values) => console.log("Form data: ", values)}
    >
      <Form className="rsvp-container">
        <label htmlFor="name">Guest Name 1:</label>
        <Field name="name" type="text" />
        <RSVPFormError name="name" />
        <label htmlFor="name2">Guest Name 2:</label>
        <Field name="name2" type="text" />
        <RSVPFormError name="name2" />
        <label htmlFor="dietary">Dietary requirements, if any:</label>
        <Field name="dietary" type="text" />
        <RSVPFormError name="dietary" />
        <label htmlFor="song">
          Request a song that'll get you on the dance floor:
        </label>
        <Field name="song" type="text" placeholder="Artist & song..." />
        <RSVPFormError name="song" />
        <button type="submit">Send RSVP</button>
      </Form>
    </Formik>
  );
};
