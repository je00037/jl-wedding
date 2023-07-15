import React, { useCallback, useEffect, useState } from "react";
import {
  AttributeValue,
  DynamoDBClient,
  GetItemCommand,
  GetItemCommandInput,
} from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { animated, useSpring, useTransition } from "@react-spring/web";
import { useJsApiLoader } from "@react-google-maps/api";

import "./App.css";

import {
  Carousel,
  Divider,
  Footer,
  Header,
  Login,
  Polaroid,
  Section,
  Map,
  AboutText,
  FAQs,
  OrderOfTheDay,
} from "./components/index";

import { egg, imagesBase } from "./img/images";
import haworth from "./img/haworth.jpg";
import {
  fadeInAndOutConfig,
  fadeInSoonerConfig,
  fadeInLastConfig,
  staggerConfig,
} from "./animation-config";

import { faqs } from "./faqs";
import { orders } from "./orders";

function App() {
  const [images, setImages] = useState(imagesBase);
  const [isAuthed, setIsAuthed] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "***REMOVED***", // move to env var
  });

  const lockedContentAnimation = useTransition(isAuthed, fadeInAndOutConfig);
  const staggeredImages = useTransition(images, staggerConfig);
  const fadeInSooner = useSpring(fadeInSoonerConfig);
  const fadeInLast = useSpring(fadeInLastConfig);

  const clickHandler = useCallback(() => {
    const newImages = imagesBase.concat([egg]);
    setImages(newImages);
  }, []);

  const serverlessClickHandler = async () => {
    const data = await fetch("/.netlify/functions/hello");
    const json = await data.json();
    console.log("data from server: ", json);
  };

  // accesskey for aws: ***REMOVED***

  // const client = new DynamoDBClient({
  //   region: "eu-west-2",
  //   credentials: {
  //     secretAccessKey: "***REMOVED***",
  //     accessKeyId: "***REMOVED***",
  //   },
  // });

  // const reqParams: GetItemCommandInput = {
  //   TableName: "Wedding",
  //   Key: { userId: { N: "1" } },
  // };

  // const getData = async () => {
  //   try {
  //     const req = new GetItemCommand(reqParams);
  //     const dbdata = await client.send(req);
  //     const data = dbdata?.Item && unmarshall(dbdata.Item);
  //     console.log(data);
  //   } catch (e) {
  //     console.log("error! ", e);
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <>
      <Header clickHandler={clickHandler} authed={isAuthed} />
      <main className="content">
        <animated.div className="headline-container" style={fadeInSooner}>
          <p className="headline-text">Lucy and Joe are getting married!</p>
        </animated.div>
        <Carousel>
          {staggeredImages((style, { source, caption, index }) => (
            <animated.div style={style}>
              <Polaroid image={source} caption={caption} index={index} />
            </animated.div>
          ))}
        </Carousel>
        <animated.p style={fadeInLast}>
          We can't wait to celebrate with you all on <br />
          <span className="bold">Saturday 17th August, 2024.</span>
        </animated.p>
        <button onClick={serverlessClickHandler}>Test!</button>
        <Divider />
        {lockedContentAnimation((style, auth) => {
          return !auth ? (
            <animated.section style={style} className="content-group">
              <Login handleLogin={() => setIsAuthed(true)} />
            </animated.section>
          ) : (
            <animated.section style={style} className="content-group">
              <Section title="About the Venue" id="venue">
                {isLoaded ? (
                  <>
                    <Map />
                    <AboutText />
                  </>
                ) : (
                  <p>Map loading...</p>
                )}
              </Section>
              <Divider />
              <Section title="Order of the Day" id="order">
                <OrderOfTheDay orders={orders} />
              </Section>
              <Divider />
              <Section title="Accommodation" id="accom">
                <div style={{ marginBottom: "1.5rem" }}>
                  <Polaroid
                    image={haworth}
                    caption={"Haworth High Street"}
                    index={0}
                    largeImg
                    skew={false}
                  />
                </div>
                <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
                  <p>
                    Haworth is a lovely village in hilly moors of West
                    Yorkshire. There are loads of options for your stay.
                  </p>
                  <ul style={{ textAlign: "left" }}>
                    <li style={{ color: "gold" }}>
                      <span style={{ fontWeight: "bold" }}>
                        Pubs with Rooms:&nbsp;
                      </span>
                      <span style={{ color: "rgb(27, 68, 128)" }}>
                        there are numerous pubs in Haworth with rooms available.
                      </span>
                    </li>
                    <li>
                      Traditional B&Bs: Several traditional B&Bs serve Haworth
                      and the local area.
                    </li>
                    <li>
                      Air B&Bs: There are a huge number of Air B&Bs to consider
                      in Haworth and the surrounding area.
                    </li>
                    <li>
                      Premier Inn: A Premier Inn is situated in Bingley, a 15
                      minute drive away.
                    </li>
                    <li>
                      Travelodge: A 10 minute drive will take you to Keighley
                      where there's a Travelodge.
                    </li>
                  </ul>
                </div>
              </Section>
              <Divider />
              <Section title="Travel & Taxis" id="travel" />
              <Divider />
              <Section title="RSVP" id="rsvp" />
              <Divider />
              <Section title="FAQs" id="faqs">
                <FAQs faqs={faqs} />
              </Section>
            </animated.section>
          );
        })}
        <Divider />
      </main>
      <Footer />
    </>
  );
}

export default App;
