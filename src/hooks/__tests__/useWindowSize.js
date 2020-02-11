import { renderHook, act } from "@testing-library/react-hooks";
import useWindowSize from "../useWindowSize";

const resizeWindow = (x, y) => {
  window.innerWidth = x;
  window.innerHeight = y;
  window.dispatchEvent(new Event("resize"));
};

describe("useWindowSize hook", () => {
  it("should return the window size on load", () => {
    const { result } = renderHook(useWindowSize);

    expect(result.current).toEqual(
      expect.objectContaining({
        height: expect.any(Number),
        width: expect.any(Number)
      })
    );
  });

  it("should update size when the window resizes", () => {
    const { rerender, result } = renderHook(useWindowSize);

    let sizeOnLoad = result.current;

    act(() => {
      resizeWindow(1000, 2000);
    });

    rerender();

    expect(result.current.width).not.toEqual(sizeOnLoad.width);
    expect(result.current.height).not.toEqual(sizeOnLoad.height);
  });
});
