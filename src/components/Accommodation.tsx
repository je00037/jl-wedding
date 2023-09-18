import React, { FC } from "react";
import "./Accommodation.css";

const listItems = [
  {
    title: "Ponden Mill Glamping",
    description:
      "If you fancy staying in the treehouse, tee-pee, pioneer wagon, or onion tent which are all on-site at Ponden Mill, then let us know!",
    url: "http://www.themillatponden.co.uk/index.php/glamping",
  },
  {
    title: "Pubs with Rooms",
    description:
      "There are numerous pubs in Haworth with rooms available, such as The Old White Lion, The Black Bull Inn, and The Old Hall Inn to name a few. Rooms at The Fleece have been reserved for the groom's family.",
    url: "https://www.google.com/search?sca_esv=556828901&tbs=lf:1,lf_ui:9&tbm=lcl&q=haworth+pubs&rflfq=1&num=10&ved=2ahUKEwjMoo2d7tyAAxVohf0HHToMAQsQtgN6BAgREAI#rlfi=hd:;si:;mv:[[53.834888199999995,-1.9385248],[53.8280897,-1.9758415]];tbs:lrf:!1m4!1u3!2m2!3m1!1e1!1m4!1u5!2m2!5m1!1sgcid_3pub!1m4!1u5!2m2!5m1!1sgcid_3british_1restaurant!1m4!1u2!2m2!2m1!1e1!1m4!1u1!2m2!1m1!1e1!1m4!1u1!2m2!1m1!1e2!2m1!1e2!2m1!1e5!2m1!1e1!2m1!1e3!3sIAEqAkdC,lf:1,lf_ui:9",
  },
  {
    title: "Traditional B&Bs",
    description:
      "Several traditional B&Bs serve Haworth and the local area; Ashmount House is a well-rated one.",
    url: "https://www.google.com/search?q=haworth+bed+%26+breakfast&sca_esv=556828901&tbm=lcl&ei=Yn3aZJCVNeCwhbIPq6mp0AM&ved=0ahUKEwiQzved7tyAAxVgWEEAHatUCjoQ4dUDCAk&uact=5&oq=haworth+bed+%26+breakfast&gs_lp=Eg1nd3Mtd2l6LWxvY2FsIhdoYXdvcnRoIGJlZCAmIGJyZWFrZmFzdDIGEAAYFhgeMggQABiKBRiGA0jZG1CUCFiDG3ABeACQAQCYAWKgAaIKqgECMTa4AQPIAQD4AQHCAgcQABiKBRhDwgIFEAAYgATCAggQABgWGB4YD8ICCBAAGIoFGJECwgIHEAAYDRiABIgGAQ&sclient=gws-wiz-local#rlfi=hd:;si:;mv:[[53.832183799999996,-1.9534740000000002],[53.8282682,-1.9571889999999998]];tbs:lrf:!1m4!1u7!2m2!7m1!4e1!1m4!1u2!2m2!2m1!1e1!1m4!1u10!2m2!11m1!1e3!2m1!1e2!2m7!1e17!4m2!17m1!1e3!4m2!17m1!1e8!3sIAE,lf:1,lf_ui:6",
  },
  {
    title: "Air B&Bs",
    description:
      "There are a huge number of Air B&Bs to consider in Haworth and the surrounding area with lots of cosy cottages to choose from.",
    url: "https://www.airbnb.com/",
  },
  {
    title: "Premier Inn",
    description:
      "A Premier Inn is situated in Bingley, a 15 minute drive away.",
    url: "https://www.premierinn.com/gb/en/hotels/england/west-yorkshire/bradford/bradford-north-bingley.html",
  },
  {
    title: "Travelodge",
    description:
      "A 10 minute drive will take you to Keighley where there's a Travelodge.",
    url: "https://www.travelodge.co.uk/hotels/463/Keighley-hotel",
  },
];

export const Accommodation: FC = () => {
  return (
    <div className="text-container">
      <p>
        Haworth is a lovely village in hilly moors of West Yorkshire. There are
        loads of options for your stay - tap/click the headings to find out
        more.
      </p>
      <ul style={{ textAlign: "left" }}>
        {listItems.map((item) => (
          <li>
            <a href={item.url} target="_blank" rel="noreferrer">
              <span className="bullet-label">{item.title}:&nbsp;</span>
            </a>
            <span>{item.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
