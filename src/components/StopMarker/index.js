import React from "react";
import styled from "styled-components";

const StyledStopMarker = styled.div`
  height: 22px;
  width: 22px;
  border-radius: 50%;
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.textLight};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.16), 0 1px 3px 0 rgba(0, 0, 0, 0.23);
`;

const StopMarker = ({ stopLetter, onClick }) => {
  return <StyledStopMarker onClick={onClick}>{stopLetter}</StyledStopMarker>;
};

export default StopMarker;
