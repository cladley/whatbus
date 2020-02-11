import React from "react";
import styled from "styled-components/macro";

const StyledQuickViewContent = styled.div`
  padding: ${props => props.theme.padding.standard};
  display: flex;

  h4 {
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    padding-right: 4px;
  }
`;

const RouteList = styled.ul`
  list-style: none;
  display: flex;
  font-size: 12px;
  font-weight: 700;

  li {
    padding-right: 4px;
  }
`;

const QuickViewContent = ({ routes = [] }) => {
  return (
    <StyledQuickViewContent>
      <h4>Serves: </h4>
      <RouteList data-testid="quick-routes-list">
        {routes.map((r, index) => (
          <li key={r.id}>{r.name} </li>
        ))}
      </RouteList>
    </StyledQuickViewContent>
  );
};

export default QuickViewContent;
