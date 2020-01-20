import React from "react";
import styled from "styled-components/macro";
import { useSelector } from "react-redux";

import StopArrivalsCard from "../components/StopArrivalsCard";

const StyledPredictionsView = styled.div`
  padding: 10px;
`;

const PredictionsView = props => {
  const arrivals = useSelector(state => state.arrivals);

  return (
    <StyledPredictionsView>
      {Object.keys(arrivals).map(naptanId => {
        const stop = arrivals[naptanId];
        return (
          <StopArrivalsCard
            key={naptanId}
            naptanId={naptanId}
            name={stop.name}
          ></StopArrivalsCard>
        );
      })}

      {/* <StopArrivalsCard name="Manor Gardens" arrivals={[]}></StopArrivalsCard> */}
    </StyledPredictionsView>
  );
};

export default PredictionsView;
