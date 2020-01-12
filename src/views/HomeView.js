import React, { useState } from "react";
import styled from "styled-components//macro";
import StopArrivalsCard from "../components/StopArrivalsCard";

const StyledHomeView = styled.div`
  padding: 10px;
`;

const HomeView = props => {
  const [arrivals, setArrivals] = useState([
    {
      id: "asdasd",
      number: "217",
      destination: "Seven Sisters Road / Parkhurst Road"
    },
    { id: "vxcvxcv", number: "32", destination: "Finsbury Park" },
    { id: "erwerw", number: "264", destination: "Oxford Street" }
  ]);

  const handleDeleteArrival = id => {
    console.log("called");
    const remainingItems = arrivals.filter(item => item.id !== id);
    setArrivals(remainingItems);
  };

  return (
    <StyledHomeView>
      <StopArrivalsCard
        name="Seven Sisters Road / Parkhurst Road"
        arrivals={arrivals}
        deleteArrival={handleDeleteArrival}
      ></StopArrivalsCard>
      {/* <StopArrivalsCard name="Manor Gardens" arrivals={[]}></StopArrivalsCard> */}
    </StyledHomeView>
  );
};

export default HomeView;
