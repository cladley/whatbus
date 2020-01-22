import React, { useRef } from "react";
import GoogleMap from "../components/GoogleMap";
import styled from "styled-components/macro";

import Card from "../components/Card";
import DragPanel from "../components/DragPanel";
import useWindowSize from "../utilities/useWindowSize";

const StyledStopDetailsCard = styled.div`
  position: absolute;
  height: 50vh;
  width: 94vw;
  left: 3vw;

  .card {
    height: 100%;
  }
`;

const Page = styled.div`
  height: 100%;
`;

const StopDetailsCard = ({ children }) => {
  const dragPanelRef = useRef();
  const { height } = useWindowSize();
  const cardHeight = height / 1.5;
  const cardBottom = -cardHeight + 85;

  // setTimeout(() => {
  //   dragPanelRef.current.sayHello();
  // }, 4000);

  return (
    <DragPanel
      direction="vertical"
      stopPoints={[0, -250, cardBottom]}
      bounds={[-cardHeight, 0]}
      onStopPointReached={() => console.log("point reached")}
      onUpdate={() => console.log("updating")}
      ref={dragPanelRef}
    >
      <StyledStopDetailsCard
        style={{
          height: `${cardHeight}px`,
          bottom: `${cardBottom}px`
        }}
      >
        {children}
      </StyledStopDetailsCard>
    </DragPanel>
  );
};

const ExplorerView = props => {
  return (
    <Page>
      <GoogleMap />
      <StopDetailsCard>
        <Card>
          <Card.Title text="Hiiiiiii" />
          <Card.Content>This is some content</Card.Content>
        </Card>
      </StopDetailsCard>
    </Page>
  );
};

export default ExplorerView;
