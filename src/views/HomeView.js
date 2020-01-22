import React from "react";
import styled from "styled-components/macro";

import BusSearch from "../components/BusSearch";

const StyledHomeView = styled.div`
  height: 100%;

  .bus-search {
    height: 100%;
  }
`;

const HomeView = props => {
  return (
    <StyledHomeView>
      <BusSearch />
    </StyledHomeView>
  );
};

export default HomeView;
