import { useState } from "react";

export function useCheckPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>();
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
        setIsSuccess(true);
        setIsLoading(false);
      } else {
        console.log("not authorised, wrong password!");
        setIsSuccess(false);
        setIsLoading(false);
        setIncorrectCount((prevCount) => ++prevCount);
      }
    } catch (e) {}
  }

  return { isLoading, isSuccess, incorrectCount, checkPassword };
}
