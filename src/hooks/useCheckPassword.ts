import { useState } from "react";
import { AuthState } from "../App";

export function useCheckPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [outcome, setOutcome] = useState<AuthState>();
  const [incorrectCount, setIncorrectCount] = useState(0);

  async function checkPassword(pwd: string) {
    setIsLoading(true);
    try {
      const data = await fetch("/.netlify/functions/login", {
        method: "POST",
        body: pwd,
      });
      const json = await data.json();
      console.log("returned to client: ", json);
      if (json.successfulLogin) {
        console.log("password good!");
        setOutcome("authed");
        setIsLoading(false);
      } else {
        console.log("not authorised, wrong password!");
        setOutcome("incorrect");
        setIsLoading(false);
        setIncorrectCount((prevCount) => ++prevCount);
      }
    } catch (e) {
      setOutcome("error");
      setIsLoading(false);
    }
  }

  return { isLoading, outcome, incorrectCount, checkPassword };
}
