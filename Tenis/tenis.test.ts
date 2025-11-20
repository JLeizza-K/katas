import { expect } from "chai";
import { Game, Player } from "./tenis.ts";

describe("tenis", () => {
  const player1 = new Player("carlitos");
  const player2 = new Player("jorge");

  const game = new Game(player1, player2);

  it("should return the initial points as 0 and 0", () => {
    const result = game.status();

    expect(result).to.equal("carlitos tiene 0 puntos, jorge tiene 0 puntos");
  });

  it("should return the first player with 15 points", () => {
    game.player1.addPoint();
    const result = game.status();

    expect(result).to.equal("carlitos tiene 15 puntos, jorge tiene 0 puntos");
  });

  it("should return both players with 15 points", () => {
    game.player2.addPoint();
    const result = game.status();

    expect(result).to.equal("carlitos tiene 15 puntos, jorge tiene 15 puntos");
  });
  it("should return both players with 30 points", () => {
    game.player1.addPoint();
    game.player2.addPoint();
    const result = game.status();

    expect(result).to.equal("carlitos tiene 30 puntos, jorge tiene 30 puntos");
  });
  it("should return both players with 40 points and in deuce", () => {
    game.player1.addPoint();
    game.player2.addPoint();
    const result = game.status();

    expect(result).to.equal(
      "carlitos tiene 40 puntos, jorge tiene 40 puntos, estan en deuce",
    );
  });

  it("should return that the second player has advantage", () => {
    game.player2.addPoint();
    const result = game.status();

    expect(result).to.equal(
      "carlitos tiene 40 puntos, jorge tiene advantage puntos",
    );
  });

  //    it("should go back to deuce", () => {
  //     game.player1.addPoint();
  //     const result = game.status();

  //     expect(result).to.equal("carlitos tiene 40 puntos, jorge tiene 40 puntos, estan en deuce");
  //   });

  //    it("should return that the second player won", () => {
  //     game.player2.addPoint();
  //     game.player2.addPoint();
  //     const result = game.status();

  //     expect(result).to.equal("jorge gano");
  //   });

  //   it("should throw an error when points are negative", () => {
  //     const badCall = () => game.addPoints("carlos");

  //     expect(badCall).to.throw("invalid input");
  //   });
});
