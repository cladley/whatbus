import { renderHook, act } from "@testing-library/react-hooks";
import useWindowSize from "../useWindowSize";

const resizeWindow = (x, y) => {
  window.innerWidth = x;
  window.innerHeight = y;
  window.dispatchEvent(new Event("resize"));
};

describe("useWindowSize hook", () => {
  it("should return the window size on load", () => {
    let size;

    renderHook(() => {
      size = useWindowSize();
    });

    expect(size).toEqual(
      expect.objectContaining({
        height: expect.any(Number),
        width: expect.any(Number)
      })
    );
  });

  it("should update size when the window resizes", () => {
    let size;

    const { rerender } = renderHook(() => {
      size = useWindowSize();
    });

    let sizeOnLoad = size;

    act(() => {
      resizeWindow(1000, 2000);
    });

    rerender();

    expect(size.width).not.toEqual(sizeOnLoad.width);
    expect(size.height).not.toEqual(sizeOnLoad.height);
  });
});
