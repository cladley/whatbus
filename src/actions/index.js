import * as tfl from "../tfl";
import * as transforms from "../tfl/transformResponse";

const getArrivalPredictionsForStop = naptanId => {
  return {
    type: "API",
    payload: {
      url: tfl.getArrivalPredictionForStopUrl(naptanId),
      transformResponse: transforms.predictionsForStopTransform,
      onSuccess: data => setArrivalPredictionsForStop(naptanId, data)
    }
  };
};

const setArrivalPredictionsForStop = (naptanId, data) => {
  return {
    type: "SET_ARRIVAL_PREDICTIONS_FOR_STOP",
    payload: {
      naptanId,
      data
    }
  };
};

const removeRouteFromArrivalPredictionsForStop = (naptanId, routeNumber) => {
  return {
    type: "REMOVE_ROUTE_PREDICTIONS",
    payload: {
      naptanId,
      routeNumber
    }
  };
};

export {
  getArrivalPredictionsForStop,
  removeRouteFromArrivalPredictionsForStop
};
