import React from "react";
import PropTypes from "prop-types";
import { useDrag } from "react-use-gesture";
import { useSpring, animated } from "react-spring";
import * as utilities from "../../utilities";

const DragPanel = ({
  className,
  stopPoints,
  bounds,
  onStopPointReached,
  onUpdate,
  ...props
}) => {
  const [{ x }, set] = useSpring(() => ({ x: 0 }));
  const bind = useDrag(
    ({ vxvy: [velocityX], down, movement: [mx, my], last, memo }) => {
      let newX;

      if (!memo) {
        memo = x.value - mx;
        const isIntentionalGesture =
          Math.abs(mx) > 10 && Math.abs(mx) > Math.abs(my);

        if (!isIntentionalGesture) return;
      }

      if (last) {
        const projectedEndpoint =
          x.value + utilities.projection(velocityX, "fast");
        newX = utilities.findNearestNumberInArray(
          projectedEndpoint,
          stopPoints
        );
      } else {
        newX = utilities.rubberBandIfOutOfBounds(bounds[0], bounds[1], mx);
      }

      onUpdate();
      set({ x: newX, immediate: false });

      return memo;
    }
  );

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
  bounds: PropTypes.arrayOf(PropTypes.number),
  spotPoints: PropTypes.arrayOf(PropTypes.number),
  onUpdate: PropTypes.func,
  onStopPointReached: PropTypes.func
};

export default DragPanel;
