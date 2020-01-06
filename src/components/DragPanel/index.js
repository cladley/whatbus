import React from "react";
import PropTypes from "prop-types";
import { useDrag } from "react-use-gesture";
import { useSpring, animated } from "react-spring";

const DragPanel = ({
  className,
  stopPoints,
  onStopPointReached,
  onUpdate,
  ...props
}) => {
  const [{ x }, set] = useSpring(() => ({ x: 0 }));
  const bind = useDrag(({ down, movement: [mx, my] }) => {
    set({ x: down ? mx : 0 });
    onUpdate();
  });

  return (
    <animated.div
      {...bind()}
      className={className}
      {...props}
      style={{
        transform: x.interpolate(x => `translateX(${x}px)`)
      }}
    >
      {props.children}
    </animated.div>
  );
};

DragPanel.propTypes = {
  className: PropTypes.string,
  onUpdate: PropTypes.func,
  onStopPointReached: PropTypes.func,
  spotPoints: PropTypes.arrayOf(PropTypes.number)
};

export default DragPanel;
