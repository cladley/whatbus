import React from "react";
import styled from "styled-components";

const StyledArrval = styled.li`
  padding: 12px 15px;
  display: flex;
  width: 100%;
`;

const VehicleDetails = styled.div`
  flex: 1;

  h3 {
    font-size: 24px;
    margin-bottom: 2px;
  }

  p {
    font-size: 12px;
    color: rgba(0, 0, 0, 0.6);
  }
`;

const VehicleTimes = styled.div`
  display: flex;
  flex-direction: column;
`;

const TimesNext = styled.span`
  font-size: 24px;
  font-weight: 700;
  text-align: right;
  margin-bottom: 2px;

  .mins {
    font-weight: 300;
    font-size: 14px;
    padding-left: 4px;
    display: inline-block;
  }
`;

const TimesAfter = styled.span`
  font-size: 12px;
`;

const Arrival = props => {
  return (
    <StyledArrval>
      <VehicleDetails>
        <h3>271</h3>
        <p>Moorgate, Finsbury Square</p>
      </VehicleDetails>
      <VehicleTimes>
        <TimesNext>
          6 <span class="mins">mins</span>
        </TimesNext>
        <TimesAfter>then 9 mins</TimesAfter>
      </VehicleTimes>
    </StyledArrval>
  );
};

export default Arrival;
