import React, { FC } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { markerSvg } from "../img/images";

export const Map: FC = () => {
  return (
    <GoogleMap
      mapContainerStyle={{
        width: "90%",
        height: "400px",
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
  );
};
