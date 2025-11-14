import { expect } from "chai";
import { Game } from "./FizzBuzz";

describe("Dividers game", () => {
  const game = new Game([
    { name: "fizz", divider: 3 },
    { name: "buzz", divider: 5 },
  ]);

  it("Should return correct number of fizzes", () => {
    const result = game.fizzBuzz(10);
    expect(result[0]).to.equal("fizz count is 3");
  });

  it("Should return correct number of buzzes", () => {
    const result = game.fizzBuzz(10);
    expect(result[1]).to.equal("buzz count is 2");
  });
});
