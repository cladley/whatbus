import * as tfl from "../tfl";
import * as transforms from "../tfl/transformResponse";

export const getStopByLatLon = (lat, lon, radius = 300) => {
  return {
    type: "API",
    payload: {
      url: tfl.getStopsByLatLonUrl(lat, lon, radius),
      transformResponse: transforms.stopsForMapTransform,
      onSuccess: data => setStopsByLatLon(data)
    }
  };
};

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

const setStopsByLatLon = data => {
  return {
    type: "SET_STOPS_BY_LAT_LON",
    payload: {
      data
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

const setSelectedStop = naptanId => {
  return {
    type: "SET_SELECTED_STOP",
    payload: {
      naptanId
    }
  };
};

export {
  getArrivalPredictionsForStop,
  removeRouteFromArrivalPredictionsForStop,
  setSelectedStop
};
