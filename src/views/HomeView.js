import React from "react";
import StopArrivalsCard from "../components/StopArrivalsCard";

const HomeView = props => {
  return (
    <React.Fragment>
      <StopArrivalsCard
        name="Seven Sisters Road / Parkhurst Road"
        arrivals={[]}
      ></StopArrivalsCard>
    </React.Fragment>
  );
};

export default HomeView;
