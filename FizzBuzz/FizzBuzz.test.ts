import { expect } from "chai";
import { fizzBuzz } from "./FizzBuzz";

describe("FizzBuzz", () => {
  it("Should return correct number of fizzes", () => {
    const result = fizzBuzz(10);
    expect(result.fizz).to.equal(3);
  });

  it("Should return correct number of buzzes", () => {
    const result = fizzBuzz(10);
    expect(result.buzz).to.equal(2);
  });
});
