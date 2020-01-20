import React from "react";
import { render, fireEvent } from "@testing-library/react";

import { ThemeProvider } from "styled-components/macro";
import theme from "../../../style/theme";
import BusSearch from "../";

function renderComponent(component) {
  function Wrapper({ children }) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  }

  return {
    ...render(component, {
      wrapper: Wrapper
    })
  };
}

jest.mock("../routes");

describe("<BusSearch /> component", () => {
  test("render with no errors", () => {
    renderComponent(<BusSearch />);
  });

  test("it renders correct number of routes that match search text", async () => {
    const routeNumber = "270";

    const { getByTestId, findAllByTestId } = renderComponent(<BusSearch />);
    const searchInput = getByTestId("bus-search");

    fireEvent.change(searchInput, { target: { value: "oxford" } });
    let searchItems = await findAllByTestId("search-item");
    expect(searchItems.length).toEqual(2);

    fireEvent.change(searchInput, { target: { value: "Trafalgar" } });
    searchItems = await findAllByTestId("search-item");
    expect(searchItems.length).toEqual(1);

    fireEvent.change(searchInput, { target: { value: routeNumber } });
    searchItems = await findAllByTestId("search-item");
    expect(searchItems.length).toEqual(1);
  });
});
