import React, { useRef, useEffect } from "react";
import styled from "styled-components/macro";
import { useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";

import * as utilities from "../../utilities";
import useDragger from "../../hooks/useDragger";
import useWindowSize from "../../hooks/useWindowSize";
import { ReactComponent as DetailsIcon } from "../../assets/details.svg";
import { ReactComponent as CloseIcon } from "../../assets/close.svg";
import { getStopByLatLon } from "../../actions";

const HeaderQuickViewHeight = 50;

const PanelVisibility = {
  HIDDEN: 0,
  SMALL: 1,
  FULL: 2
};

const StyledDetailsPanel = styled.div`
  position: absolute;
  height: 60vh;
  width: 100vw;
  left: 0;
  bottom: -60vh;
  box-shadow: ${props => props.theme.shadows.card};
`;

const Header = styled.div`
  background: ${props => props.theme.colors.primary};
  width: 100vw;
  position: absolute;
  top: 0;
  height: calc(40vh + ${HeaderQuickViewHeight}px);
  color: ${props => props.theme.colors.textLight};

  h2 {
    text-transform: uppercase;
  }
`;

const QuickViewTitle = styled.h2`
  padding: 15px;
  color: ${props => props.theme.colors.textLight};
`;

const FullViewTitle = styled.h2`
  padding: 15px;
  font-size: 48px;
`;

const Content = styled.div`
  background: ${props => props.theme.colors.backgroundLight};
  width: 100vw;
  height: calc(100% - ${HeaderQuickViewHeight}px);
  position: absolute;
  top: ${HeaderQuickViewHeight}px;
`;

const DetailsButton = styled.button`
  width: 44px;
  height: ${HeaderQuickViewHeight}px;
  padding: 0 8px;
  border: 0;
  background: transparent;
  position: absolute;
  right: 0;
  top: -${HeaderQuickViewHeight}px;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const DetailsPanel = ({ stopPoint, onPanelClosed }) => {
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }));
  const dispatch = useDispatch();
  const { height } = useWindowSize();
  const panelOpenState = useRef(stopPoint);

  const panelHeight = height * 0.6;
  const panelStopPoints = [0, -100, -panelHeight];
  const headerFullTranslatePxValue = height - panelHeight;

  const handleStopPointReached = point => {
    if (point === panelStopPoints[PanelVisibility.HIDDEN]) {
      onPanelClosed();
      panelOpenState.current = PanelVisibility.HIDDEN;
    } else if (point === panelStopPoints[PanelVisibility.SMALL]) {
      panelOpenState.current = PanelVisibility.SMALL;
    } else if (point === panelStopPoints[PanelVisibility.FULL]) {
      panelOpenState.current = PanelVisibility.FULL;
    }
  };

  const { bind } = useDragger(
    "vertical",
    x,
    y,
    set,
    [-panelHeight, 0],
    panelStopPoints,
    handleStopPointReached
  );

  // Fetch stops within radius at lat lon
  useEffect(() => {
    dispatch(getStopByLatLon(51.560913, -0.120881));
  }, [dispatch]);

  useEffect(() => {
    const stopPointPxValue = panelStopPoints[stopPoint];
    set({ y: stopPointPxValue });
    panelOpenState.current = stopPoint;
  }, [stopPoint, panelStopPoints, set]);

  const toggleDetails = () => {
    let stopPointPxValue;
    if (panelOpenState.current === PanelVisibility.SMALL) {
      stopPointPxValue = panelStopPoints[PanelVisibility.FULL];
      panelOpenState.current = PanelVisibility.FULL;
    } else if (panelOpenState.current === PanelVisibility.FULL) {
      stopPointPxValue = panelStopPoints[PanelVisibility.SMALL];
      panelOpenState.current = PanelVisibility.SMALL;
    }

    set({ y: stopPointPxValue });
  };

  return (
    <StyledDetailsPanel
      as={animated.div}
      style={{
        transform: y.interpolate(y => `translate3d(0, ${y}px, 0)`)
      }}
    >
      <Header
        {...bind()}
        as={animated.div}
        style={{
          height: `${height}px`,
          transform: y.interpolate(y => {
            if (y >= panelStopPoints[PanelVisibility.SMALL]) {
              return `translate3D(0px, 0px, 0)`;
            }

            const translateY = utilities.rangeMap(
              [-100, -panelHeight],
              [0, -headerFullTranslatePxValue],
              y
            );

            return `translate3D(0px, ${translateY}px, 0)`;
          })
        }}
      >
        <QuickViewTitle>Manor Gardens</QuickViewTitle>
        <FullViewTitle
          as={animated.h2}
          style={{
            opacity: y.interpolate(y => {
              if (y >= panelStopPoints[PanelVisibility.SMALL]) {
                return 0;
              }

              return utilities.rangeMap([-100, -panelHeight], [0, 1], y);
            })
          }}
        >
          Manor Gardens
        </FullViewTitle>
      </Header>
      <Content>
        <DetailsButton onClick={toggleDetails}>
          <DetailsIcon width="28" />
          <CloseIcon width="28" />
        </DetailsButton>
      </Content>
    </StyledDetailsPanel>
  );
};

export default DetailsPanel;

export { PanelVisibility };
