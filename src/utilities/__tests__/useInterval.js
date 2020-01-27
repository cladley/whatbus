import { renderHook } from "@testing-library/react-hooks";
import useInterval from "../useInterval";

afterEach(() => {
  jest.useRealTimers();
});

describe("useInteral hook", () => {
  it("Should call the callback immediately when immediate property is set to true", () => {
    const immediate = true;
    const callback = jest.fn();

    renderHook(() => useInterval(callback, 1000, immediate));

    expect(callback).toBeCalled();
  });

  it("Should not call the callback immediately when immediate property is set to false", () => {
    const immediate = false;
    const callback = jest.fn();

    renderHook(() => useInterval(callback, 1000, immediate));

    expect(callback).not.toBeCalled();
  });

  it("Should call recurring callback at x interval", () => {
    jest.useFakeTimers();
    const delay = 1000;
    const callback = jest.fn();

    renderHook(() => useInterval(callback, delay));

    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(delay);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(delay);
    expect(callback).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(delay);
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it("Should pause recurring callback when delay to set to null", () => {
    jest.useFakeTimers();
    let delay = 1000;
    const callback = jest.fn();

    const { rerender } = renderHook(() => useInterval(callback, delay));

    jest.advanceTimersByTime(delay);
    expect(callback).toHaveBeenCalledTimes(1);

    delay = null;
    rerender();
    jest.advanceTimersByTime(delay);
    expect(callback).toHaveBeenCalledTimes(1);

    delay = 1000;
    rerender();
    jest.advanceTimersByTime(delay);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});
