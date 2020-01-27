import React, { useRef, useEffect, useState } from "react";
import GoogleMap from "../components/GoogleMap";
import styled from "styled-components/macro";
import { useDispatch, useSelector } from "react-redux";

import { ReactComponent as DetailsIcon } from "../assets/details.svg";
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

const PanelVisibility = {
  HIDDEN: 0,
  LITTLE: 1,
  FULL: 2
};

const StopDetailsCard = ({ isStopSelected, onCardHidden, children }) => {
  const dispatch = useDispatch();
  const dragPanelRef = useRef();
  const { height } = useWindowSize();
  const cardHeight = height / 1.5;
  const cardBottom = -cardHeight;
  const panelStopPoints = [0, -85, cardBottom];

  useEffect(() => {
    dispatch(getStopByLatLon(51.560913, -0.120881));
  }, [dispatch]);

  if (isStopSelected) {
    dragPanelRef.current.goToPoint(panelStopPoints[PanelVisibility.LITTLE]);
  }

  const handleStopPointReached = point => {
    if (point === panelStopPoints[PanelVisibility.HIDDEN]) {
      onCardHidden();
    }
  };

  return (
    <DragPanel
      direction="vertical"
      stopPoints={panelStopPoints}
      bounds={[cardBottom, 0]}
      onStopPointReached={handleStopPointReached}
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

const DetailsButton = styled.button`
  width: 44px;
  height: 100%;
  padding: 0 8px;
  border: 0;
  background: transparent;
  position: absolute;
  right: 0;
  top: 0;
`;

const ExplorerView = () => {
  const stops = useSelector(({ map }) => map.stopsById);
  const [selectedStopId, setSelectedStopId] = useState(null);

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
              onClick={() => setSelectedStopId(naptanId)}
            />
          );
        })}
      </GoogleMap>
      <StopDetailsCard
        isStopSelected={!!selectedStopId}
        onCardHidden={() => {
          setSelectedStopId(null);
        }}
      >
        <Card>
          <Card.Title text="Hiiiiiii">
            <DetailsButton aria-label="Show stop details">
              <DetailsIcon />
            </DetailsButton>
          </Card.Title>
          <Card.Content>This is some content</Card.Content>
        </Card>
      </StopDetailsCard>
    </Page>
  );
};

export default ExplorerView;
