import React from "react";
import styled from "styled-components/macro";
import Arrival from "./Arrival";

const StyledStopArrivalsCard = styled.div`
  box-shadow: ${props => props.theme.shadows.card};
  background: ${props => props.theme.colors.background};

  header {
    background: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.textLight};
    padding: 12px 15px;
  }

  h2 {
    text-transform: uppercase;
  }

  ul {
    background-color: ${props => props.theme.colors.backgroundLight};
  }

  li:not(:last-child) {
    border-bottom: 0.4px solid ${props => props.theme.colors.border};
  }
`;

const StopArrivalsCard = ({ name = "Please add name", arrivals = [] }) => {
  return (
    <StyledStopArrivalsCard>
      <header>
        <h2>{name}</h2>
      </header>
      <ul>
        <Arrival></Arrival>
        <Arrival></Arrival>
        <Arrival></Arrival>
      </ul>
    </StyledStopArrivalsCard>
  );
};

export default StopArrivalsCard;
