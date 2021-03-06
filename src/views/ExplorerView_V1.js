import React, { useRef, useEffect, useState } from "react";
import GoogleMap from "../components/GoogleMap";
import styled from "styled-components/macro";
import { useDispatch, useSelector } from "react-redux";
import { useSpring, animated, interpolate, config } from "react-spring";

import { ReactComponent as DetailsIcon } from "../assets/details.svg";
import { ReactComponent as CloseIcon } from "../assets/close.svg";
import Card from "../components/Card";
import StopMarker from "../components/StopMarker";
import DragPanel from "../components/DragPanel";
import useWindowSize from "../hooks/useWindowSize";
import { getStopByLatLon } from "../actions";

const StyledStopDetailsCard = styled.div`
  position: absolute;
  height: 50vh;
  width: 100vw;
  left: 0;
  padding-top: 45px;

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

const StopDetailsCard = ({ stopPoint, onStopPointReached, children }) => {
  const dispatch = useDispatch();
  const dragPanelRef = useRef();
  const { height } = useWindowSize();
  const cardHeight = height / 1.5;
  const cardBottom = -cardHeight;
  const panelStopPoints = [0, -85, cardBottom];

  const [{ y }, set] = useSpring(() => ({
    y: 0,
    config: config.stiff
  }));

  useEffect(() => {
    dispatch(getStopByLatLon(51.560913, -0.120881));
  }, [dispatch]);

  useEffect(() => {
    dragPanelRef.current.goToPoint(panelStopPoints[stopPoint]);
    if (stopPoint === PanelVisibility.FULL) {
      set({ y: -246 });
    }
  }, [stopPoint, panelStopPoints, set]);

  const handleStopPointReached = point => {
    if (point === panelStopPoints[PanelVisibility.HIDDEN]) {
      onStopPointReached(PanelVisibility.HIDDEN);
    } else if (point === panelStopPoints[PanelVisibility.LITTLE]) {
      onStopPointReached(PanelVisibility.LITTLE);
    } else if (point === panelStopPoints[PanelVisibility.FULL]) {
      onStopPointReached(PanelVisibility.FULL);
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

      <BackPanel
        as={animated.div}
        style={{
          transform: y.interpolate(y => `translate(0, ${y}px)`)
        }}
      />
    </DragPanel>
  );
};

const BackPanel = styled.div`
  background: red;
  width: 100vw;
  height: 490px;
  position: absolute;
  top: 0;
  z-index: -1;
`;

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
  const [stopPoint, setStopPoint] = useState(PanelVisibility.HIDDEN);

  const showStopDetails = () => {
    setStopPoint(PanelVisibility.FULL);
  };

  const closeStopDetails = () => {
    setStopPoint(PanelVisibilbity.HIDDEN);
  };

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
              onClick={() => {
                setSelectedStopId(naptanId);
                setStopPoint(PanelVisibility.LITTLE);
              }}
            />
          );
        })}
      </GoogleMap>
      <StopDetailsCard
        stopPoint={stopPoint}
        onStopPointReached={point => {
          setStopPoint(point);
        }}
      >
        <Card>
          {/* <Card.Title text="Hiiiiiii">
            {stopPoint === PanelVisibility.LITTLE ? (
              <DetailsButton
                aria-label="Show stop details"
                onClick={showStopDetails}
              >
                <DetailsIcon />
              </DetailsButton>
            ) : (
              <DetailsButton
                aria-label="Close stop details"
                onClick={closeStopDetails}
              >
                <CloseIcon />
              </DetailsButton>
            )}
          </Card.Title> */}
          <Card.Content>This is some content</Card.Content>
        </Card>
      </StopDetailsCard>
    </Page>
  );
};

export default ExplorerView;
