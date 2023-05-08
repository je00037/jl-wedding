import us from "./us.jpg";
import glasto from "./glastonbury.jpg";
import madrid from "./madrid2020.jpg";
import italy from "./italy2020.jpg";
import nycegg from "./nyc-egg.jpg";

export const imagesBase = [
  {
    source: us,
    caption: "New York City, 2022",
    index: 0,
  },
  {
    source: madrid,
    caption: "Madrid, July 2020",
    index: 1,
  },
  {
    source: glasto,
    caption: "Glastonbury, June 2022",
    index: 2,
  },
  {
    source: italy,
    caption: "Italy, April 2020",
    index: 3,
  },
];

export const egg = {
  source: nycegg,
  caption: "New York City, 2022",
  index: 4,
};

export const markerSvg = {
  path: "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
  fillColor: "gold",
  fillOpacity: 0.9,
  scale: 2,
  strokeColor: "darkblue",
  strokeWeight: 2,
};
