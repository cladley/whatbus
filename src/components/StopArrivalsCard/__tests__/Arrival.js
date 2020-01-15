import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "styled-components/macro";
import theme from "../../../style/theme";
import Arrival from "../Arrival";

const dummyVehicles = [
  {
    id: "TEST1",
    vehicleId: "TEST_ID_1",
    destinationName: "Barnet Hospital",
    expectedArrival: "2020-01-15T16:31:08Z"
  },
  {
    id: "TEST2",
    vehicleId: "TEST_ID_2",
    destinationName: "Barnet Hospital",
    expectedArrival: "2020-01-15T16:35:08Z"
  },
  {
    id: "TEST3",
    vehicleId: "TEST_ID_3",
    destinationName: "Barnet Hospital",
    expectedArrival: "2020-01-15T16:36:08Z"
  }
];

beforeAll(() => {
  jest
    .spyOn(Date, "now")
    .mockImplementation(() => new Date("2020-01-15T16:30:08Z").valueOf());
});

afterAll(() => {
  Date.now.mockRestore();
});

const renderComponent = component => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("<Arrival> component", () => {
  const arrivalData = {
    id: "1233456",
    number: "217",
    vehicles: dummyVehicles,
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

  test("show vehicle arrival times in minutes", () => {
    const { getByTestId } = renderComponent(<Arrival {...arrivalData} />);

    const nextVehicleTime = getByTestId("next-time");
    const afterVehicleTimes = getByTestId("after-times");
    expect(nextVehicleTime).toHaveTextContent("1 min");
    expect(afterVehicleTimes).toHaveTextContent("5, 6 mins");
  });

  test('show vehicle arrival time as "due" is vehicle is due in less than a minute', () => {
    jest
      .spyOn(Date, "now")
      .mockImplementation(() => new Date("2020-01-15T16:31:08Z").valueOf());
    const { getByTestId } = renderComponent(<Arrival {...arrivalData} />);

    const nextVehicleTime = getByTestId("next-time");
    expect(nextVehicleTime).toHaveTextContent("due");
  });
});
