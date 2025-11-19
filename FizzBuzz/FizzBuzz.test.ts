import { expect } from "chai";
import { Game } from "./FizzBuzz";

describe("Dividers game", () => {
  const game = new Game([
    { name: "fizz", divider: 3 },
    { name: "buzz", divider: 5 },
  ]);
  const game2 = new Game([
    { name: "pato", divider: 7 },
    { name: "nato", divider: 8 },
  ]);

  it("Should return correct number of fizzes", () => {
    const result = game.fizzBuzz(10);
    expect(result[0]).to.equal("fizz count is 3");
  });

  it("Should return correct number of buzzes", () => {
    const result = game.fizzBuzz(10);
    expect(result[1]).to.equal("buzz count is 2");
  });

  it("Should return correct number of patos", () => {
    const result = game2.fizzBuzz(21);
    expect(result[0]).to.equal("pato count is 3");
  });

  it("Should return correct number of natos", () => {
    const result = game2.fizzBuzz(64);
    expect(result[1]).to.equal("nato count is 8");
  });
});
