import React, { forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { useDrag } from "react-use-gesture";
import { useSpring, interpolate, animated } from "react-spring";
// import useVelocityTrackedSpring from "../../utilities/useVelocityTrackedSpring";

import * as utilities from "../../utilities";

const DragPanel = forwardRef(
  (
    {
      className,
      stopPoints,
      direction = "horizontal",
      bounds,
      onStopPointReached,
      onUpdate,
      ...props
    },
    ref
  ) => {
    useImperativeHandle(ref, () => {
      return {
        sayHello() {
          console.log("Helloe");
        }
      };
    });

    const [{ x, y }, set] = useSpring(() => ({ x: 0, y: 0 }));
    const bind = useDrag(({ vxvy, movement, last, memo, event }) => {
      const coordinate = direction === "horizontal" ? 0 : 1;
      const coordinateLetter = direction === "horizontal" ? "x" : "y";

      if (!memo) {
        memo = {
          x: x.value - movement[0],
          y: y.value - movement[1]
        };

        const isIntentionalGesture =
          Math.abs(movement[0]) > 10 &&
          Math.abs(movement[0]) > Math.abs(movement[1]);

        // if (!isIntentionalGesture) return;
      }

      let newValue;

      if (last) {
        const currentValue = direction === "horizontal" ? x.value : y.value;

        const projectedEndpoint =
          currentValue + utilities.projection(vxvy[coordinate], "fast");

        newValue = utilities.findNearestNumberInArray(
          projectedEndpoint,
          stopPoints
        );

        set({ [coordinateLetter]: newValue, immediate: false });
      } else {
        newValue = utilities.rubberBandIfOutOfBounds(
          bounds[0],
          bounds[1],
          movement[coordinate] + memo[coordinateLetter],
          0.08
        );
        set({ [coordinateLetter]: newValue, immediate: true });
      }

      onUpdate();
      return memo;
    });

    return (
      <animated.div
        {...bind()}
        {...props}
        className={className}
        style={{
          transform: interpolate([x, y], (x, y) => `translate(${x}px, ${y}px)`)
        }}
      >
        {props.children}
      </animated.div>
    );
  }
);

DragPanel.propTypes = {
  className: PropTypes.string,
  bounds: PropTypes.arrayOf(PropTypes.number),
  spotPoints: PropTypes.arrayOf(PropTypes.number),
  onUpdate: PropTypes.func,
  onStopPointReached: PropTypes.func
};

export default DragPanel;
