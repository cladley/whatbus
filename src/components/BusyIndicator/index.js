import React from "react";
import styled, { keyframes } from "styled-components/macro";
import { ReactComponent as TflLogo } from "../../assets/tfl.svg";

const flip = keyframes`
  from {
    transform: rotateX(0);
  }

  to {
    transform: rotateX(-180deg);
  }
`;

const StyledBusyIndicator = styled.div`
  /* animation: ${flip} 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite both; */

  svg {
    display: block;
  }
`;

const BusyIndicator = ({ width = 100, height = 100 }) => {
  return (
    <StyledBusyIndicator>
      <TflLogo width={width} height={height} />
    </StyledBusyIndicator>
  );
};

export default BusyIndicator;
