import React from "react";
import styled from "styled-components/macro";
import DragPanel from "../DragPanel";

const StyledArrval = styled.li`
  .dragPanel {
    display: flex;
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
`;

const Arrival = props => {
  const handleDragPanelUpdate = () => {
    console.log("Drag panel ipdateing being called");
  };

  return (
    <StyledArrval>
      <DragPanel
        className="dragPanel"
        stopPoints={[0]}
        onStopPointReached={() => {}}
        onUpdate={handleDragPanelUpdate}
      >
        <VehicleDetails>
          <h3>271</h3>
          <p>Moorgate, Finsbury Square</p>
        </VehicleDetails>
        <VehicleTimes>
          <TimesNext>
            6 <span className="mins">mins</span>
          </TimesNext>
          <TimesAfter>then 9 mins</TimesAfter>
        </VehicleTimes>
        <DeleteButton>Delete</DeleteButton>
      </DragPanel>
    </StyledArrval>
  );
};

export default Arrival;
