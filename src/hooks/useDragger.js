import { useDrag } from "react-use-gesture";
import * as utilities from "../utilities";

function useDragger(
  direction,
  x,
  y,
  set,
  bounds,
  stopPoints,
  onStopPointReached
) {
  const bind = useDrag(({ vxvy, movement, last, memo, event }) => {
    const coordinate = direction === "horizontal" ? 0 : 1;
    const coordinateLetter = direction === "horizontal" ? "x" : "y";
    if (!memo) {
      memo = {
        x: x.value - movement[0],
        y: y.value - movement[1]
      };
      let isIntentionalGesture;
      // THIS IS A HACK FOR NOW
      if (direction === "horizontal") {
        isIntentionalGesture =
          Math.abs(movement[0]) > 10 &&
          Math.abs(movement[0]) > Math.abs(movement[1]);
      } else {
        isIntentionalGesture =
          Math.abs(movement[1]) > 10 &&
          Math.abs(movement[1]) > Math.abs(movement[0]);
      }
      if (!isIntentionalGesture) return;
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
      onStopPointReached(newValue);
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
    // onUpdate();
    return memo;
  });
  return { bind };
}

export default useDragger;
