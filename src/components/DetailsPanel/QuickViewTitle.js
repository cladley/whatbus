import React from "react";
import styled from "styled-components/macro";
import { animated, useTransition } from "react-spring";

const StyledQuickViewTitle = styled.h2`
  padding: 15px;
  color: ${props => props.theme.colors.textLight};
  position: absolute;
  left: 0;
  top: 0;
`;

const QuickViewTitle = ({ title }) => {
  const titleTransition = useTransition(title, t => t, {
    from: { transform: "translate3d(0,-40px,0)" },
    enter: { transform: "translate3d(0,0px,0)" },
    leave: { transform: "translate3d(0, 40px, 0)" }
  });

  return titleTransition.map(({ item, props, key }) => (
    <StyledQuickViewTitle as={animated.h2} key={key} style={props}>
      {item}
    </StyledQuickViewTitle>
  ));
};

export default QuickViewTitle;
