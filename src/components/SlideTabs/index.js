import React from "react";
import styled from "styled-components/macro";
import { useSpring, animated } from "react-spring";
import useDragger from "../../hooks/useDragger";
import useWindowSize from "../../hooks/useWindowSize";

const TabButton = styled.button`
  font-weight: 500;
  font-size: 14px;
  text-transform: uppercase;
  line-height: 40px;
  background-color: transparent;
  border: 0;
  flex: 1;
`;

const TabButtons = styled.div`
  display: flex;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
`;

const Strip = styled.div`
  height: 2px;
  width: 100%;
  background: ${props => props.theme.colors.backgroundLight};
`;

const StripMarker = styled.div`
  width: 50%;
  height: 100%;
  background-color: ${props => props.theme.colors.primary};
`;

const TabsWrapper = styled.div`
  width: 100vw;
  overflow: hidden;
`;

const TabsTrack = styled.div`
  display: flex;
`;

const StyledTab = styled.div`
  width: 100vw;
  flex-shrink: 0;
  padding: ${props => props.theme.padding.standard};
  height: 400px;
`;

const Tab = ({ children }) => {
  return <StyledTab>{children}</StyledTab>;
};

const renderTabButtons = (children, onTabButtonClicked) => {
  return React.Children.map(children, (child, index) => {
    return (
      <TabButton onClick={() => onTabButtonClicked(index)}>
        {child.props.title}
      </TabButton>
    );
  });
};

const SlideTabs = ({ children }) => {
  const { width } = useWindowSize();
  const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }));

  const { bind } = useDragger(
    "horizontal",
    x,
    y,
    set,
    [-width, 0],
    [0, -width]
  );

  const onTabButtonClicked = index => {
    set({ x: -(width * index) });
  };

  return (
    <TabsWrapper>
      <TabButtons>{renderTabButtons(children, onTabButtonClicked)}</TabButtons>
      <Strip>
        <StripMarker
          as={animated.div}
          style={{
            transform: x.interpolate(x => `translate3d(${-x / 2}px, 0, 0)`)
          }}
        ></StripMarker>
      </Strip>
      <TabsTrack
        {...bind()}
        as={animated.div}
        style={{
          transform: x.interpolate(x => `translate3d(${x}px, 0, 0)`)
        }}
      >
        {children}
      </TabsTrack>
    </TabsWrapper>
  );
};

SlideTabs.Tab = Tab;

export default SlideTabs;
