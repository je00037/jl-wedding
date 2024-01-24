import React, { useCallback, useState, useMemo } from "react";
import { animated, useSpring, useTransition } from "@react-spring/web";
import { useJsApiLoader } from "@react-google-maps/api";
import Confetti from "react-confetti";

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
  RSVPFormSecond,
} from "./components/index";

import { egg, randomImgSelection } from "./img/images";
import haworth from "./img/haworth.webp";
import taxi from "./img/bronte-cars-2.png";
import {
  fadeInAndOutConfig,
  fadeInSoonerConfig,
  fadeInLastConfig,
  staggerConfig,
} from "./animation-config";

import { faqs } from "./faqs";
import { orders } from "./orders";
import { Accommodation } from "./components/Accommodation";

export type AuthState = "authed" | "unauthed" | "incorrect" | "error";

const imageSet = randomImgSelection(4);

const RSVP_SUBTITLE =
  "We're really looking forward to welcoming you to our wedding. If for any reason you can't make it, please let Lucy or Joe know directly.";
const RSVP_ENABLED = true;

// TODO: Fix submission of single 1 RSVP

function App() {
  const [images, setImages] = useState(imageSet);
  const [loginStatus, setLoginStatus] = useState<AuthState>("unauthed");
  const [isAuthed, setIsAuthed] = useState(
    window.localStorage.getItem("ljwauth") ? true : false
  );

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
        window.localStorage.setItem("ljwauth", "true");
      },
      incorrect: () => setLoginStatus("incorrect"),
      error: () => setLoginStatus("error"),
    }),
    [setIsAuthed, setLoginStatus]
  );

  return (
    <>
      <animated.div style={fadeInLast}>
        <Confetti recycle={false} numberOfPieces={250} />
      </animated.div>
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
              <Section title="Travel & Taxis" id="travel">
                <img src={taxi} alt="bronte-taxis" style={{ width: "80%" }} />
                <div className="travel-text">
                  <p>
                    From Leeds, it's easy to get the train or bus (such as the
                    Aireline 60) to Keighley. You would then need a local bus or
                    short taxi from there to get to Haworth.
                  </p>
                  <p>
                    There are also likely to be several drivers that you might
                    be able to have a lift with, details of which we can share
                    nearer the time.
                  </p>
                  <p>
                    The local taxi company serving Haworth is Bronte Taxis. In
                    due course we will be arranging cars or a minibus with them
                    to be on-hand for taking people to bed after the reception.
                  </p>
                </div>
              </Section>
              <Divider />
              <Section title="RSVP" subtitle={RSVP_SUBTITLE} id="rsvp">
                {RSVP_ENABLED ? (
                  <RSVPFormSecond />
                ) : (
                  <p>
                    The RSVP form will appear here once formal invitations have
                    been sent out.
                  </p>
                )}
              </Section>
              <Divider />
              <Section title="FAQs" id="faqs">
                <FAQs faqs={faqs} />
              </Section>
            </animated.section>
          );
        })}
        <Divider />
        <Footer />
      </main>
    </>
  );
}

export default App;
