import React from "react";
import styled from "styled-components/macro";

import SlideTabs from "../components/SlideTabs";
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
      <SlideTabs>
        <SlideTabs.Tab title="Day Routes">
          Here are all the day routes
        </SlideTabs.Tab>
        <SlideTabs.Tab title="Night Routes">
          And here are the night routes
        </SlideTabs.Tab>
      </SlideTabs>
    </StyledHomeView>
  );
};

export default HomeView;
