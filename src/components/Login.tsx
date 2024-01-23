import React, { FC, useState, useEffect } from "react";
import "./Login.css";
import padlock from "../img/padlock.webp";
import { AuthState } from "../App";
import { animated, useTransition } from "@react-spring/web";
import { fadeInAndOutConfigTwo } from "../animation-config";
import { LoadingDots } from "./LoadingDots";
import { useCheckPassword } from "../hooks/useCheckPassword";

interface LoginProps {
  handleLogin: {
    approve: () => void;
    incorrect: () => void;
    error: () => void;
  };
  loginStatus: AuthState;
}

// {lockedContentAnimation((style, auth) => {
//   console.log({ auth, loginStatus });
//   return !auth ? (
//     <animated.section style={style} className="content-group">
//       <Login
//         handleLogin={serverlessClickHandler}
//         loginStatus={loginStatus}
//       />
//     </animated.section>

export const Login: FC<LoginProps> = ({ handleLogin, loginStatus }) => {
  const [input, setInput] = useState("");

  const loginTextAnimation = useTransition(loginStatus, fadeInAndOutConfigTwo);

  const { isLoading, outcome, incorrectCount, checkPassword } =
    useCheckPassword();

  useEffect(() => {
    if (outcome === "authed") {
      handleLogin.approve();
    } else if (outcome === "incorrect") {
      handleLogin.incorrect();
      setInput("");
    } else if (outcome === "error") {
      handleLogin.error();
    }
  }, [handleLogin, outcome, incorrectCount]);

  let loginText: string;
  switch (loginStatus) {
    case "unauthed":
      loginText = "Enter your password to unlock more details...";
      break;
    case "incorrect":
      loginText = "That isn't quite right - try again...";
      break;
    case "error":
      loginText =
        "Hmm, an error! Not your fault - try the same password again.";
      break;
    default:
      loginText = "";
  }

  return (
    <div className="login-container" id="locked">
      <div className="locked-text-container">
        <img src={padlock} alt="content locked" className="padlock" />
        {loginTextAnimation((style, _) => (
          <animated.h1
            className={
              loginStatus === "unauthed"
                ? "locked-text"
                : incorrectCount > 1
                ? "locked-text-incorrect shake"
                : "locked-text-incorrect"
            }
            style={style}
          >
            {loginText}
          </animated.h1>
        ))}
        {/* <h1
          className="locked-text"
          style={loginStatus === "incorrect" ? { color: "darkred" } : {}}
        >
          {loginText}
        </h1> */}
      </div>
      <form>
        <div className="form-container">
          <input
            name="password"
            className="password-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              checkPassword(input);
            }}
            className="submit-input"
            disabled={input === "" || isLoading ? true : false}
          >
            {isLoading ? <LoadingDots /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};
