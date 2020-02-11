import React from "react";
import { render, fireEvent, getByText } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducer from "../../reducers";
import apiMiddleware from "../../middleware/apiMiddleware";
import fetchMock from "jest-fetch-mock";
import { ThemeProvider } from "styled-components/macro";
import theme from "../../style/theme";
import ExplorerView from "../ExplorerView";
import dummyStopPoints from "./stoppoints";

fetchMock.enableMocks();

jest.mock("../../components/GoogleMap", () => {
  return {
    __esModule: true,
    default: ({ children }) => {
      return <div data-test-id="google-maps">{children}</div>;
    }
  };
});

function reduxRender(
  ui,
  {
    initialState,
    store = createStore(reducer, initialState, applyMiddleware(apiMiddleware)),
    ...options
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </Provider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...options });
}

describe("<ExplorerView />", () => {
  beforeEach(() => {
    fetch.mockResponse(JSON.stringify(dummyStopPoints));
  });

  afterEach(() => {
    fetch.resetMocks();
  });

  it("should render with no issues", () => {
    reduxRender(<ExplorerView />);
  });

  it("should display the correct number of stop markers", async () => {
    const { findAllByTestId } = reduxRender(<ExplorerView />);

    const stopMarkers = await findAllByTestId("stop marker");
    expect(stopMarkers.length).toBe(2);
  });

  it("should display stop name on Details panel when stop marker is clicked", async () => {
    const { findByText, queryAllByText } = reduxRender(<ExplorerView />);
    const dummyStopLetter = dummyStopPoints.stopPoints[0].stopLetter;
    const dummyStopName = dummyStopPoints.stopPoints[0].commonName;

    const stopMarkerF = await findByText(dummyStopLetter);

    fireEvent.click(stopMarkerF);
    expect(queryAllByText(dummyStopName).length).toEqual(2);
  });

  it("should display routes available at select stop", async () => {
    const { findByText, getByTestId } = reduxRender(<ExplorerView />);
    const dummyStopLetter = dummyStopPoints.stopPoints[1].stopLetter;

    const stopMarkerF = await findByText(dummyStopLetter);

    fireEvent.click(stopMarkerF);
    const routes = getByTestId("quick-routes-list");
    expect(routes).toHaveTextContent("17 263 271 43 N41");
  });
});
