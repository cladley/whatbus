import React from "react";
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
        arrivals={[]}
      ></StopArrivalsCard>
    </StyledHomeView>
  );
};

export default HomeView;
