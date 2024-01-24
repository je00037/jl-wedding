import React, { FC, useState, useEffect } from "react";
import { Formik, Field, Form } from "formik";

import { useRSVP } from "../hooks/useRSVP";

import { RSVPFormError } from "./RSVPFormError";
import { LoadingDots } from "./LoadingDots";

import "./RSVPFormSecond.css";

interface Values {
  name1: string;
  name2: string;
  name3: string;
  name4: string;
  dietary: string;
  song: string;
}

const validate = (values: Values) => {
  const errors: any = {};
  if (values.name1.length > 30) {
    errors.name1 =
      "That's a long name! A bit too long. What do your friends call you?";
  }
  if (values.name1.length === 0) {
    errors.name1 =
      "Doesn't this guest have a name? Either add their name or remove this guest using the button below.";
  }
  if (values.name2.length > 30) {
    errors.name2 =
      "That's a long name! A bit too long. What do your friends call you?";
  }
  if (values.name2.length === 0) {
    errors.name2 =
      "Doesn't this guest have a name? Either add their name or remove this guest using the button below.";
  }
  if (values.name3.length > 30) {
    errors.name3 =
      "That's a long name! A bit too long. What do your friends call you?";
  }
  if (values.name3.length === 0) {
    errors.name3 =
      "Doesn't this guest have a name? Either add their name or remove this guest using the button below.";
  }
  if (values.name4.length > 30) {
    errors.name4 =
      "That's a long name! A bit too long. What do your friends call you?";
  }
  if (values.name4.length === 0) {
    errors.name4 =
      "Doesn't this guest have a name? Either add their name or remove this guest using the button below.";
  }
  if (values.dietary.length > 200) {
    errors.dietary =
      "Get in touch with Lucy and Joe if your requirements are more specific than can fit into this box!";
  }
  if (values.song.length > 100) {
    errors.song =
      "We only need the song title and artist, not the entire lyrics...";
  }
  return errors;
};

export const RSVPFormSecond: FC = () => {
  const [guestInputs, setGuestInputs] = useState(1);
  const [showLimitMsg, setShowLimitMsg] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { isLoading, isSuccess, sendRSVP } = useRSVP();

  const increaseGuestInputs = () => {
    if (guestInputs === 4) {
      setShowLimitMsg(true);
      return;
    }
    setGuestInputs((prev) => prev + 1);
  };

  const decreaseGuestInputs = () => {
    if (guestInputs === 1) return;
    if (showLimitMsg) {
      setShowLimitMsg(false);
    }
    setGuestInputs((prev) => prev - 1);
  };

  useEffect(() => {
    if (isSuccess) {
      window.localStorage.setItem("ljwrsvp", "true");
      setHasSubmitted(true);
    }
  }, [isSuccess]);

  const hasRSVPd = Boolean(window.localStorage.getItem("ljwrsvp"));

  return hasSubmitted || hasRSVPd ? (
    <div className="rsvp-thanks">
      <p>
        <b>Thanks for RSVP'ing!</b> <br /> If you need to amend any details, get
        in touch with Lucy or Joe.
      </p>
    </div>
  ) : (
    <>
      <Formik
        validate={validate}
        validateOnMount
        initialValues={{
          name1: "",
          name2: " ",
          name3: " ",
          name4: " ",
          dietary: "",
          song: "",
        }}
        onSubmit={async (values) => {
          await sendRSVP(values);
        }}
      >
        {(formik) => (
          <>
            <Form className="rsvp-container">
              {Array.from({ length: guestInputs }, (_, i) => {
                const currentName = `name${i + 1}` as
                  | "name1"
                  | "name2"
                  | "name3"
                  | "name4";
                return (
                  <div key={`${currentName}-key`} className="field-container">
                    <label htmlFor={currentName}>Guest Name {i + 1}:</label>
                    <Field
                      name={currentName}
                      type="text"
                      key={`${currentName}-key`}
                      className="field-item"
                      placeholder="First name & surname..."
                      disabled={isLoading}
                      autoComplete="off"
                    />
                    {formik.touched[currentName] &&
                      formik.errors[currentName] && (
                        <RSVPFormError name={currentName} />
                      )}
                  </div>
                );
              })}
              {showLimitMsg && (
                <p>
                  Who are you, the Von Trapps? Get in touch with Lucy & Joe if
                  you're bringing more than 4 people!
                </p>
              )}
              <div className="guest-controls">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    increaseGuestInputs();
                  }}
                  disabled={showLimitMsg}
                  className="guest-add-btn"
                >
                  +
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    decreaseGuestInputs();
                  }}
                  disabled={guestInputs === 1}
                  className="guest-minus-btn"
                >
                  -
                </button>
              </div>
              <div className="field-container">
                <label htmlFor="dietary">Dietary requirements, if any:</label>
                <Field
                  name="dietary"
                  type="text"
                  className="field-item"
                  placeholder="Leave blank if none..."
                  disabled={isLoading}
                  autoComplete="off"
                />
                {formik.touched["dietary"] && formik.errors["dietary"] && (
                  <RSVPFormError name="dietary" />
                )}
              </div>
              <div className="field-container">
                <label htmlFor="song">A song you'll dance to:</label>
                <Field
                  name="song"
                  type="text"
                  className="field-item"
                  placeholder="Arist - Title..."
                  disabled={isLoading}
                  autoComplete="off"
                />
                {formik.touched["song"] && formik.errors["song"] && (
                  <RSVPFormError name="song" />
                )}
              </div>
              <button
                className="submit-rsvp"
                type="submit"
                disabled={!formik.isValid || isLoading}
              >
                {isLoading ? <LoadingDots /> : "Send"}
              </button>
              {isSuccess === false && !isLoading && (
                <p className="submission-error">
                  Hmm, that didn't work.
                  <br /> Try submitting the RSVP form again.
                </p>
              )}
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};
