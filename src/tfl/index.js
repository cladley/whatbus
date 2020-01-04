import * as urls from "./urls";
import { appId, appKey } from "../config";

export const getStopsByLatLonUrl = (lat, lon, radius) => {
  return urls.STOPS_BY_LAT_LON.replace("{{APP_ID}}", appId)
    .replace("{{APP_KEY}}", appKey)
    .replace("{{LAT}}", lat)
    .replace("{{LON}}", lon)
    .replace("{{RADIUS}}", radius);
};
