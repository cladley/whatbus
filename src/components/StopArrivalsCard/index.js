import React, { useState } from "react";
import styled from "styled-components/macro";
import { useTransition, animated } from "react-spring";
import Arrival from "./Arrival";

const StyledStopArrivalsCard = styled.div`
  box-shadow: ${props => props.theme.shadows.card};
  background: ${props => props.theme.colors.background};
  margin-bottom: 20px;

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
    overflow: hidden;
  }

  li {
    overflow: hidden;
  }

  li:not(:last-child) {
    border-bottom: 0.4px solid ${props => props.theme.colors.border};
  }
`;

const StopArrivalsCard = ({
  name = "Please add name",
  arrivals = [],
  deleteArrival
}) => {
  // NOTE: had to hardcode the height of the Arrival card here to
  // get the animation of height: 0 to work.
  const transitions = useTransition(arrivals, arrival => arrival.id, {
    from: { height: 68 },
    enter: { height: 68 },
    leave: { height: 0 }
  });

  return (
    <StyledStopArrivalsCard>
      <header>
        <h2>{name}</h2>
      </header>
      <ul>
        {transitions.map(({ item, props, key }) => {
          return (
            <animated.li key={key} style={props}>
              <Arrival
                id={item.id}
                number={item.number}
                destination={item.destination}
                onDelete={() => deleteArrival(item.id)}
              ></Arrival>
            </animated.li>
          );
        })}
      </ul>
    </StyledStopArrivalsCard>
  );
};

export default StopArrivalsCard;
