import us from "./us.webp";
import glasto from "./glastonbury.webp";
import madrid from "./madrid2020.webp";
import italy from "./italy2020.webp";
import nycegg from "./nyc-egg.webp";
import yorkshire1 from "./yorkshire2021.webp";
import yorkshire2 from "./yorkshire2021-2.webp";
import keswick from "./keswick-2020.webp";
import krakow from "./krakow-2018.webp";
import liverpool from "./liverpool-2018.webp";
import london from "./london-2018.webp";
import majorca from "./majorca-2022.webp";
import nottingham from "./nottingham-2020.webp";
import york from "./york-2018.webp";
import leeds from "./leeds-2023.webp";
import glastonbury from "./glastonbury-2023.webp";
import lisbon from "./lisbon-2022.webp";
import saltburn from "./saltburn-2023.webp";

interface ImageSource {
  source: string;
  caption: string;
  index?: number;
  randomId?: number;
}

type ImageSet = ImageSource[];

export const imagesBase: ImageSet = [
  {
    source: us,
    caption: " New York City, 2022",
  },
  {
    source: madrid,
    caption: "Madrid, July 2019",
  },
  {
    source: glasto,
    caption: "Glastonbury, June 2022",
  },
  {
    source: italy,
    caption: "Italy, April 2019",
  },
  {
    source: yorkshire1,
    caption: "Yorkshire, 2021",
  },
  {
    source: yorkshire2,
    caption: "Yorkshire, 2021",
  },
  { source: keswick, caption: "Keswick, August 2020" },
  { source: krakow, caption: "Krakow, December 2018" },
  { source: liverpool, caption: "Liverpool, April 2018" },
  { source: london, caption: "London, 2018" },
  { source: majorca, caption: "Majorca, September 2022" },
  { source: nottingham, caption: "Nottingham, 2020" },
  { source: york, caption: "York, 2018" },
  { source: saltburn, caption: "Saltburn-by-the-Sea, 2023" },
  { source: lisbon, caption: "Lisbon, April 2022" },
  { source: glastonbury, caption: "Glasto, June 2023" },
  { source: leeds, caption: "Leeds, June 2023" },
];

export const randomImgSelection = (maxImgs: number) => {
  let randomSelection: ImageSet = [];
  const localImages = [...imagesBase];
  for (let i = 0; i < maxImgs; i++) {
    const randomIndex = getRandomInt(0, localImages.length - 1);
    const item = localImages[randomIndex];
    const itemToPush = {
      ...item,
      index: i,
    };
    randomSelection.push(itemToPush);
    localImages.splice(randomIndex, 1);
  }
  return randomSelection;
};

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const egg = {
  source: nycegg,
  caption: "New York City, 2022",
  index: 4,
  randomId: Math.random(),
};

export const markerSvg = {
  path: "M8 12l-4.7023 2.4721.898-5.236L.3916 5.5279l5.2574-.764L8 0l2.3511 4.764 5.2574.7639-3.8043 3.7082.898 5.236z",
  fillColor: "gold",
  fillOpacity: 0.9,
  scale: 2,
  strokeColor: "darkblue",
  strokeWeight: 2,
};
