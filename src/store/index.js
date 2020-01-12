import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "../reducers";

let middleware = [];

if (process.env.NODE_ENV !== "production") {
  middleware = [require("redux-immutable-state-invariant").default()];
}

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
