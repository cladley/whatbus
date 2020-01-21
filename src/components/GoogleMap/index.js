import React from "react";
import GoogleMapReact from "google-map-react";

const GoogleMap = ({ children }) => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCN7mEVisqt6TufCXlHxviUo5k9b2LfPTw" }}
        options={{ zoomControl: false, fullscreenControl: false }}
        defaultZoom={16}
        center={{
          lat: 51.560913,
          lng: -0.120881
        }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={() => console.log("Its been loaded")}
      >
        {children}
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMap;
