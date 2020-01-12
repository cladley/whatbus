import * as urls from "./urls";
import { appId, appKey } from "../config";

export const getStopsByLatLonUrl = (lat, lon, radius) => {
  return urls.STOPS_BY_LAT_LON.replace("{{APP_ID}}", appId)
    .replace("{{APP_KEY}}", appKey)
    .replace("{{LAT}}", lat)
    .replace("{{LON}}", lon)
    .replace("{{RADIUS}}", radius);
};

export const getArrivalPredictionForStopUrl = naptanId => {
  return "https://api.tfl.gov.uk/StopPoint/490013836F/Arrivals?app_id=6434337f&app_key=ddf7e98f6e48334e7efd30c2cbd9c483";
  // return urls.ARRIVAL_PREDICTIONS_FOR_STOP.replace("{{APP_ID}}", appId)
  //   .replace("{{APP_KEY}}", appKey)
  //   .replace("{{NAPTAN_ID}}", naptanId);
};
