import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import apiMiddleware from "../middleware/apiMiddleware";
import reducer from "../reducers";
import { saveState, loadState } from "../utilities/localStorage";

let middleware = [apiMiddleware];

if (process.env.NODE_ENV !== "production") {
  middleware = [
    require("redux-immutable-state-invariant").default(),
    ...middleware
  ];
}

let arrivals = loadState();

const store = createStore(
  reducer,
  arrivals,
  composeWithDevTools(applyMiddleware(...middleware))
);

store.subscribe(() => {
  saveState({ arrivals: store.getState().arrivals });
});

export default store;
