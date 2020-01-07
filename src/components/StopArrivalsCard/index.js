import React, { useState } from "react";
import styled from "styled-components/macro";
import { useTransition, animated } from "react-spring";
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
    overflow: hidden;
  }

  li {
    overflow: hidden;
  }

  li:not(:last-child) {
    border-bottom: 0.4px solid ${props => props.theme.colors.border};
  }
`;

const StopArrivalsCard = ({ name = "Please add name", arrivals = [] }) => {
  const [items, setItems] = useState([
    {
      id: "asdasd",
      number: "217",
      name: "Seven Sisters Road / Parkhurst Road"
    },
    { id: "vxcvxcv", number: "32", name: "Finsbury Park" },
    { id: "erwerw", number: "264", name: "Oxford Street" }
  ]);

  // NOTE: had to hardcode the height of the Arrival card here to
  // get the animation of height: 0 to work.
  const transitions = useTransition(items, item => item.id, {
    from: { height: 68 },
    enter: { height: 68 },
    leave: { height: 0 }
  });

  const deleteItem = id => {
    const remainingItems = items.filter(item => item.id !== id);
    setItems(remainingItems);
  };

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
                name={item.name}
                onDeleteItem={() => deleteItem(item.id)}
              ></Arrival>
            </animated.li>
          );
        })}
      </ul>
    </StyledStopArrivalsCard>
  );
};

export default StopArrivalsCard;
