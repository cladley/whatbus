import React, { useState } from "react";
import styled from "styled-components/macro";
import { useTransition, animated } from "react-spring";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import useInterval from "../../utilities/useInterval";
import Arrival from "./Arrival";
import {
  getArrivalPredictionsForStop,
  removeRouteFromArrivalPredictionsForStop
} from "../../actions";

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

const StopArrivalsCard = ({ naptanId = "", name = "Please add name" }) => {
  const dispatch = useDispatch();

  const [arrivals, routeNumbers] = useSelector(state => {
    return [
      state.arrivals[naptanId].arrivals,
      state.arrivals[naptanId].routeNumbers
    ];
  });

  const [visibleRouteNumbers, setVisibleRouteNumbers] = useState(routeNumbers);

  useInterval(
    () => {
      dispatch(getArrivalPredictionsForStop(naptanId));
    },
    60000,
    true
  );

  const handleDeleteArrival = routeNumber => {
    const remainingRouteNumbers = visibleRouteNumbers.filter(
      rN => rN !== routeNumber
    );
    setVisibleRouteNumbers(remainingRouteNumbers);
  };

  // NOTE: had to hardcode the height of the Arrival card here to
  // get the animation of height: 0 to work.
  const transitions = useTransition(
    visibleRouteNumbers,
    routeNumber => routeNumber,
    {
      from: { height: 68 },
      enter: { height: 68 },
      leave: { height: 0 },
      onDestroyed: routeNumber =>
        dispatch(
          removeRouteFromArrivalPredictionsForStop(naptanId, routeNumber)
        )
    }
  );

  return (
    <StyledStopArrivalsCard>
      <header>
        <h2>{name}</h2>
      </header>
      <div>
        <ul>
          {transitions.map(({ item, props, key }) => {
            return (
              <animated.li key={key} style={props}>
                <Arrival
                  id={item}
                  number={item}
                  vehicles={arrivals[item]}
                  destination={item}
                  onDelete={() => handleDeleteArrival(item)}
                ></Arrival>
              </animated.li>
            );
          })}
        </ul>
      </div>
    </StyledStopArrivalsCard>
  );
};

StopArrivalsCard.propTypes = {
  name: PropTypes.string.isRequired,
  naptanId: PropTypes.string.isRequired
};

export default StopArrivalsCard;
