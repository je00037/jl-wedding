import React, { FC, useState } from "react";
import "./Login.css";
import padlock from "../img/padlock.png";

interface LoginProps {
  handleLogin: () => void;
}

export const Login: FC<LoginProps> = ({ handleLogin }) => {
  const [input, setInput] = useState("");

  console.log({ input });
  // const text = "yorkshire";

  // async function digestMessage(message: any) {
  //   const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
  //   const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
  //   const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
  //   const hashHex = hashArray
  //     .map((b) => b.toString(16).padStart(2, "0"))
  //     .join(""); // convert bytes to hex string
  //   return hashHex;
  // }

  // digestMessage(text).then((digestHex) => console.log(digestHex));
  return (
    <div className="login-container" id="locked">
      <div className="locked-text-container">
        <img src={padlock} alt="content locked" className="padlock" />
        <h1 className="locked-text">
          Enter your password to unlock more details...
        </h1>
      </div>
      <form>
        <div className="form-container">
          <input
            name="password"
            type="text"
            className="password-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
          />
          <input
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="submit-input"
            disabled={input === "" ? true : false}
          />
        </div>
      </form>
    </div>
  );
};
