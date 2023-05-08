import React, { useCallback, useState } from "react";
import { animated, useSpring, useTransition } from "@react-spring/web";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

import "./App.css";

import {
  Carousel,
  Divider,
  Footer,
  Header,
  Login,
  Polaroid,
  Section,
} from "./components/index";

import { egg, imagesBase, markerSvg } from "./img/images";
import {
  fadeInAndOutConfig,
  fadeInSoonerConfig,
  fadeInLastConfig,
  staggerConfig,
} from "./animation-config";

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
        <Divider />
        {lockedContentAnimation((style, auth) => {
          return !auth ? (
            <animated.section style={style} className="content-group">
              <Login handleLogin={() => setIsAuthed(true)} />
            </animated.section>
          ) : (
            <animated.section style={style} className="content-group">
              <Section title="About the Venue" id="venue" />
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={{
                    height: "400px",
                    width: "600px",
                  }}
                  zoom={15}
                  center={{
                    lat: 53.8296918,
                    lng: -2.006776,
                  }}
                >
                  <MarkerF
                    icon={markerSvg}
                    position={{
                      lat: 53.831365208955,
                      lng: -2.0031833302918525,
                    }}
                  />
                </GoogleMap>
              ) : (
                <p>Map loading...</p>
              )}
              <Divider />
              <Section title="Order of the Day" id="order" />
              <Divider />
              <Section title="Accommodation" id="accom" />
              <Divider />
              <Section title="Song Requests" id="song" />
              <Divider />
              <Section title="Contact Us" id="contact" />
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
