// const initialState = {
//   "490013836F": {
//     name: "Seven Sisters Road / Parkhurst Road",
//     routeNumbers: ["17", "263"],
//     arrivals: {
//       "17": null,
//       "263": null
//     }
//   }
// };

export default (state = {}, action) => {
  switch (action.type) {
    case "SET_ARRIVAL_PREDICTIONS_FOR_STOP": {
      const { naptanId, data } = action.payload;
      const stopData = state[naptanId];

      if (!stopData) return state;

      const arrivals = stopData.arrivals;

      const updatedArrivals = Object.keys(arrivals).reduce(
        (accum, routeNumber) => {
          accum[routeNumber] = data[routeNumber];
          return accum;
        },
        Object.create(null)
      );

      const updatedStopData = {
        name: state[naptanId].name,
        routeNumbers: [...state[naptanId].routeNumbers],
        arrivals: updatedArrivals
      };

      return { ...state, [naptanId]: updatedStopData };
    }

    case "REMOVE_ROUTE_PREDICTIONS": {
      const { naptanId, routeNumber } = action.payload;
      const stopData = state[naptanId];

      const updatedRouteNumbers = stopData.routeNumbers.filter(
        r => r !== routeNumber
      );

      if (updatedRouteNumbers.length <= 0) {
        // We are not interested in any routes at that stop
        const newState = { ...state };
        delete newState[naptanId];
        return { ...newState };
      }

      const updatedArrivals = { ...stopData.arrivals };
      delete updatedArrivals[routeNumber];

      const updatedStopData = {
        name: state[naptanId].name,
        routeNumbers: updatedRouteNumbers,
        arrivals: updatedArrivals
      };

      return { ...state, [naptanId]: updatedStopData };
    }

    default:
      return { ...state };
  }
};
