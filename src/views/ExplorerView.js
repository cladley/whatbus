import React, { useState } from "react";
import GoogleMap from "../components/GoogleMap";
import styled from "styled-components/macro";
import { useSelector } from "react-redux";

import StopMarker from "../components/StopMarker";
import DetailsPanel, { PanelVisibility } from "../components/DetailsPanel";

const Page = styled.div`
  height: 100%;
`;

const ExplorerView = () => {
  const stops = useSelector(({ map }) => map.stopsById);
  const [selectedStopId, setSelectedStopId] = useState(null);
  const [stopPoint, setStopPoint] = useState(PanelVisibility.HIDDEN);

  const handleDetailsPanelClosed = () => {
    setStopPoint(PanelVisibility.HIDDEN);
    setSelectedStopId(null);
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
                setStopPoint(PanelVisibility.SMALL);
              }}
            />
          );
        })}
      </GoogleMap>
      <DetailsPanel
        stopId={selectedStopId}
        stopPoint={stopPoint}
        onPanelClosed={handleDetailsPanelClosed}
      ></DetailsPanel>
    </Page>
  );
};

export default ExplorerView;
