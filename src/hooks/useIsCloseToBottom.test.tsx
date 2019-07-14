import { isClose } from "./useIsCloseToBottom";
describe("viewport math", () => {
  it("isClose when there is no scrolling", () => {
    expect(
      isClose({
        scrollHeight: 500,
        clientHeight: 500,
        scrollY: 0
      })
    ).toBeTruthy();
  });

  it("isClose when scrolled to bottom", () => {
    expect(
      isClose({
        scrollHeight: 1500,
        clientHeight: 500,
        scrollY: 1000
      })
    ).toBeTruthy();
  });

  it("not isClose when scrolled to top", () => {
    expect(
      isClose({
        scrollHeight: 1500,
        clientHeight: 500,
        scrollY: 0
      })
    ).toBeFalsy();
  });
});
