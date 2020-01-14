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
