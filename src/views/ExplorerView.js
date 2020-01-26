import React, { useRef, useEffect } from "react";
import GoogleMap from "../components/GoogleMap";
import styled from "styled-components/macro";
import { useDispatch, useSelector } from "react-redux";

import Card from "../components/Card";
import StopMarker from "../components/StopMarker";
import DragPanel from "../components/DragPanel";
import useWindowSize from "../utilities/useWindowSize";
import { getStopByLatLon } from "../actions";

const StyledStopDetailsCard = styled.div`
  position: absolute;
  height: 50vh;
  width: 94vw;
  left: 3vw;

  .card {
    height: 100%;
  }
`;

const Page = styled.div`
  height: 100%;
`;

// https://api.tfl.gov.uk/Stoppoint?app_id=6434337f&app_key=ddf7e98f6e48334e7efd30c2cbd9c483&lat=51.560913&lon=-0.120881&stoptypes=NaptanPublicBusCoachTram&radius=376

const StopDetailsCard = ({ children }) => {
  const dispatch = useDispatch();
  const dragPanelRef = useRef();
  const { height } = useWindowSize();
  const cardHeight = height / 1.5;
  const cardBottom = -cardHeight + 85;

  useEffect(() => {
    dispatch(getStopByLatLon(51.560913, -0.120881));
  }, []);

  // setTimeout(() => {
  //   dragPanelRef.current.goToPoint(-250);
  // }, 4000);

  return (
    <DragPanel
      direction="vertical"
      stopPoints={[0, -250, cardBottom]}
      bounds={[-cardHeight, 0]}
      onStopPointReached={() => console.log("point reached")}
      onUpdate={() => console.log("updating")}
      ref={dragPanelRef}
    >
      <StyledStopDetailsCard
        style={{
          height: `${cardHeight}px`,
          bottom: `${cardBottom}px`
        }}
      >
        {children}
      </StyledStopDetailsCard>
    </DragPanel>
  );
};

const ExplorerView = props => {
  const stops = useSelector(({ map }) => map.stopsById);

  return (
    <Page>
      <GoogleMap>
        {Object.keys(stops).map(naptanId => {
          const stop = stops[naptanId];
          return (
            <StopMarker
              key={naptanId}
              lat={stop.lat}
              lng={stop.lon}
              stopLetter={stop.stopLetter}
            />
          );
        })}
      </GoogleMap>
      <StopDetailsCard>
        <Card>
          <Card.Title text="Hiiiiiii" />
          <Card.Content>This is some content</Card.Content>
        </Card>
      </StopDetailsCard>
    </Page>
  );
};

export default ExplorerView;
