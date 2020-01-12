import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "styled-components/macro";
import theme from "../../../style/theme";
import Arrival from "../Arrival";

const renderComponent = component => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("<Arrival> component", () => {
  const arrivalData = {
    id: "1233456",
    number: "217",
    destination: "Seven Sisters Road / Parkhurst Road"
  };

  test("renders the vehicle number and destination.", () => {
    const { getByTestId } = renderComponent(<Arrival {...arrivalData} />);
    const numberTitle = getByTestId("vehicle-number");
    expect(numberTitle).toHaveTextContent(arrivalData.number);
  });

  test("calls onDelete callback when delete button is clicked", () => {
    const deleteCallback = jest.fn();
    const { getByText } = renderComponent(
      <Arrival {...arrivalData} onDelete={deleteCallback} />
    );
    const deleteButton = getByText(/delete/i);
    fireEvent.click(deleteButton);
    expect(deleteCallback).toHaveBeenCalled();
  });
});
