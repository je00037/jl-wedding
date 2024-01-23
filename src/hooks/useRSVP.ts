import { useState } from "react";

interface RSVP {
  name1: string;
  name2: string | null;
  name3: string | null;
  name4: string | null;
  dietary: string | null;
  song: string | null;
}

export function useRSVP() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>();

  async function sendRSVP(rsvp: RSVP) {
    setIsLoading(true);
    try {
      const data = await fetch("/.netlify/functions/rsvp", {
        method: "POST",
        body: JSON.stringify(rsvp),
      });
      const json = await data.json();
      if (json.successfulRSVP) {
        setIsSuccess(true);
        setIsLoading(false);
      } else {
        setIsSuccess(false);
        setIsLoading(false);
      }
    } catch (e) {
      setIsSuccess(false);
      setIsLoading(false);
    }
  }

  return { isLoading, isSuccess, sendRSVP };
}
