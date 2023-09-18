import React, { FC } from "react";
import "./AboutText.css";

export const AboutText: FC = () => {
  return (
    <div className="text-container">
      <p>
        Ponden Mill is a renovated mill near Haworth, West Yorkshire. There is
        outside space for ceremonies and reception drinks, and a dining hall for
        dinner and evening entertainment.{" "}
      </p>
      <p>
        Ponden Mill has featured twice on George Clarke's Amazing Spaces for
        Channel 4, where the eccentric owner has been showing off his on-site
        accomodation creations - a treehouse next to a waterfall, and a
        two-storey tee-pee with hot-tub! You can find out more about the Mill{" "}
        <a
          className="link"
          href="http://www.themillatponden.co.uk/index.php/"
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>
        .
      </p>
      <p>
        Weddings at Ponden Mill are run by the Outside Kitchen, who are also the
        on-site caterer. You can see more information about the weddings{" "}
        <a
          className="link"
          href="https://www.pondenmillweddings.com/"
          target="_blank"
          rel="noreferrer"
        >
          here
        </a>
        .
      </p>
      <p>
        The surrounding area is beautiful. It's well worth taking the time to
        explore a little - see the{" "}
        <a className="link" href="#faqs">
          FAQs
        </a>{" "}
        for some suggestions!
      </p>
    </div>
  );
};
