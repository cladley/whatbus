export const predictionsForStopTransform = data => {
  return data
    .map(prediction => {
      return {
        id: prediction.id,
        vehicleId: prediction.vehicleId,
        destinationName: prediction.destinationName,
        direction: prediction.direction,
        expectedArrival: prediction.expectedArrival,
        lineName: prediction.lineName,
        lineId: prediction.lineId,
        stopName: prediction.stationName,
        stationName: prediction.stationName,
        towards: prediction.towards
      };
    })
    .reduce((accum, curr) => {
      accum[curr.lineId] = accum[curr.lineId] || [];
      accum[curr.lineId].push(curr);
      return accum;
    }, Object.create(null));
};

export const stopsForMapTransform = data => {
  return data.stopPoints.reduce((accum, curr) => {
    accum[curr.naptanId] = {
      stopLetter: curr.stopLetter,
      commonName: curr.commonName,
      lat: curr.lat,
      lon: curr.lon,
      modes: curr.modes,
      lines: curr.lines.map(line => ({
        id: line.id,
        name: line.name,
        uri: line.uri
      }))
    };

    return accum;
  }, Object.create(null));
};
