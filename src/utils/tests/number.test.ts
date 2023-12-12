import { calculatePercentage } from "..";

describe("calculatePercentage tests", () => {
  it("should percentage be correctly", () => {
    const percentage = calculatePercentage(42, 2000);
    expect(percentage).toBe(2.1);
  });
});
