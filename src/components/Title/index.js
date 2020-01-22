import React from "react";
import styled from "styled-components";

const StyledTitle = styled.header`
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.textLight};
  padding: 12px 15px;
  position: relative;

  h2 {
    text-transform: uppercase;
  }
`;

const Title = ({ text, children }) => {
  return (
    <StyledTitle>
      <h2>{text}</h2>
      {children}
    </StyledTitle>
  );
};

export default Title;
