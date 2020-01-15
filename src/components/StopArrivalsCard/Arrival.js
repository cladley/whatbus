import React from "react";
import styled from "styled-components/macro";
import DragPanel from "../DragPanel";

const StyledArrval = styled.div`
  overflow: hidden;
  height: 68px;

  .dragPanel {
    display: flex;
    height: 100%;
    width: 100%;
    padding: 12px 15px;
    position: relative;
  }
`;

const Wrapper = styled.div``;

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

const DeleteButton = styled.button`
  border: 0;
  height: 100%;
  color: ${props => props.theme.colors.textLight};
  background-color: ${props => props.theme.colors.primary};
  position: absolute;
  top: 0;
  right: -100px;
  font-size: 15px;
  width: 100px;

  &:active {
    background-color: ${props => props.theme.colors.primaryActive};
  }
`;

const Arrival = ({ destination, number, vehicles, onDelete }) => {
  if (!vehicles) return null;

  const calculateArrivalTime = time => {
    const arrivalTime = new Date(time);
    const diff = arrivalTime - Date.now();
    return Math.floor(diff / 1000 / 60);
  };

  const getNextArrivalTimes = vehicles => {
    return (
      vehicles
        .map(vehicle => {
          return calculateArrivalTime(vehicle.expectedArrival);
        })
        .join(", ") + " mins"
    );
  };

  const orderByArrivalTime = vehicles.sort((v1, v2) => {
    return new Date(v1.expectedArrival) - new Date(v2.expectedArrival);
  });

  const nextVehicleDue = orderByArrivalTime[0];
  let nextVehicleDueTime = calculateArrivalTime(nextVehicleDue.expectedArrival);

  nextVehicleDueTime = nextVehicleDueTime <= 0 ? "due" : nextVehicleDueTime;
  const nextArrivalTimes = getNextArrivalTimes(orderByArrivalTime.slice(1));

  return (
    <StyledArrval>
      <DragPanel
        className="dragPanel"
        stopPoints={[0, -100]}
        onStopPointReached={() => {}}
        bounds={[-100, 0]}
        onUpdate={() => {}}
      >
        <VehicleDetails>
          <h3 data-testid="vehicle-number">{number}</h3>
          <p data-testid="destination">{nextVehicleDue.destinationName}</p>
        </VehicleDetails>
        <VehicleTimes>
          <TimesNext data-testid="next-time">
            {nextVehicleDueTime}
            {nextVehicleDueTime !== "due" && (
              <span className="mins"> mins</span>
            )}
          </TimesNext>
          <TimesAfter data-testid="after-times">
            then {nextArrivalTimes}
          </TimesAfter>
        </VehicleTimes>
        <DeleteButton onClick={onDelete}>Delete</DeleteButton>
      </DragPanel>
    </StyledArrval>
  );
};

export default Arrival;
