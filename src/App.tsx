import React, { useCallback, useState, useMemo } from "react";
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

import { egg, randomImgSelection } from "./img/images";
import haworth from "./img/haworth.jpg";
import {
  fadeInAndOutConfig,
  fadeInSoonerConfig,
  fadeInLastConfig,
  staggerConfig,
} from "./animation-config";

import { faqs } from "./faqs";
import { orders } from "./orders";
import { Accommodation } from "./components/Accommodation";

export type AuthState = "authed" | "unauthed" | "incorrect";

const imageSet = randomImgSelection(4);

function App() {
  const [images, setImages] = useState(imageSet);
  const [loginStatus, setLoginStatus] = useState<AuthState>("unauthed");
  const [isAuthed, setIsAuthed] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
  });

  const lockedContentAnimation = useTransition(isAuthed, fadeInAndOutConfig);
  const staggeredImages = useTransition(images, staggerConfig);
  const fadeInSooner = useSpring(fadeInSoonerConfig);
  const fadeInLast = useSpring(fadeInLastConfig);

  const clickHandler = useCallback(() => {
    setImages([...randomImgSelection(4), { ...egg, randomId: Math.random() }]);
  }, []);

  const updateAuth = useMemo(
    () => ({
      approve: () => {
        setIsAuthed(true);
        setLoginStatus("authed");
      },
      incorrect: () => {
        setLoginStatus("incorrect");
      },
    }),
    [setIsAuthed, setLoginStatus]
  );

  return (
    <>
      <Header clickHandler={clickHandler} authed={isAuthed} />
      <main className="content">
        <animated.div className="headline-container" style={fadeInSooner}>
          <p className="headline-text">Lucy and Joe are getting married!</p>
        </animated.div>
        <Carousel>
          {staggeredImages((style, { source, caption, index }) => {
            return (
              <animated.div style={style}>
                <Polaroid image={source} caption={caption} index={index} />
              </animated.div>
            );
          })}
        </Carousel>
        <animated.p style={fadeInLast}>
          We can't wait to celebrate with you all on <br />
          <span className="bold">Saturday 17th August, 2024.</span>
        </animated.p>
        <Divider />
        {lockedContentAnimation((style, auth) => {
          console.log({ auth, loginStatus });
          return !auth ? (
            <animated.section style={style} className="content-group">
              <Login handleLogin={updateAuth} loginStatus={loginStatus} />
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
                <Polaroid
                  image={haworth}
                  caption={"Haworth High Street"}
                  index={0}
                  largeImg
                  skew={false}
                />
                <Accommodation />
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
