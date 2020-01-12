import React, { useState } from "react";
import styled from "styled-components//macro";
import StopArrivalsCard from "../components/StopArrivalsCard";

const StyledHomeView = styled.div`
  padding: 10px;
`;

const HomeView = props => {
  return (
    <StyledHomeView>
      <StopArrivalsCard
        name="Seven Sisters Road / Parkhurst Road"
        naptanId="490013836F"
      ></StopArrivalsCard>
      {/* <StopArrivalsCard name="Manor Gardens" arrivals={[]}></StopArrivalsCard> */}
    </StyledHomeView>
  );
};

export default HomeView;
