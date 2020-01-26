import React from "react";
import styled from "styled-components";

const StyledStopMarker = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background: green;
`;

const StopMarker = props => {
  return <StyledStopMarker />;
};

export default StopMarker;
