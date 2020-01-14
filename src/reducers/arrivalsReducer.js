const initialState = {
  "490013836F": {
    name: "Seven Sisters Road / Parkhurst Road",
    arrivals: {
      "17": {},
      "263": {}
    }
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_ARRIVAL_PREDICTIONS_FOR_STOP":
      console.log(action.payload);
      return state;
    default:
      return state;
  }
};
