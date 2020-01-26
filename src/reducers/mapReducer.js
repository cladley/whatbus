const initialState = {
  stopsById: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_STOPS_BY_LAT_LON": {
      return {
        ...state,
        stopsById: action.payload.data
      };
    }

    default:
      return state;
  }
};
