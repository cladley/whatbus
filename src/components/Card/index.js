import React from "react";
import styled from "styled-components/macro";

const StyledCard = styled.div`
  box-shadow: ${props => props.theme.shadows.card};
  background: ${props => props.theme.colors.background};
`;

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

const Content = ({ children }) => {
  return <div>{children}</div>;
};

const Card = ({ children }) => {
  return <StyledCard>{children}</StyledCard>;
};

Card.Title = Title;
Card.Content = Content;

export default Card;
