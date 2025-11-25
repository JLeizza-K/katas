import { expect } from "chai";
import { Game, Player } from "./tenis.ts";

describe("tennis", () => {
  const player1: Player = new Player("jorge");
  const player2: Player = new Player("carlitos");
  const game = new Game(player1, player2);

  it("should return the initial points as 0 and 0", () => {
    expect(game.status()).to.equal(
      "jorge tiene 0 puntos, carlitos tiene 0 puntos",
    );
  });

  it("should return an error when a non-existing player scores", () => {
    const badCall = () => game.pointWonBy("carlos");
    expect(badCall).to.throw("Provided name does not match current players");
  });

  it("should return the first player with 15 points", () => {
    game.pointWonBy("jorge");
    expect(game.status()).to.equal(
      "jorge tiene 15 puntos, carlitos tiene 0 puntos",
    );
  });

  it("should return both players with 15-15", () => {
    game.pointWonBy("carlitos");
    expect(game.status()).to.equal(
      "jorge tiene 15 puntos, carlitos tiene 15 puntos",
    );
  });

  it("should return deuce", () => {
    game.pointWonBy("carlitos");
    game.pointWonBy("jorge");
    game.pointWonBy("carlitos");
    game.pointWonBy("jorge");
    expect(game.status()).to.equal(
      "jorge tiene 40 puntos, carlitos tiene 40 puntos, estan en deuce",
    );
  });

  it("should say player 1 has the advantage", () => {
    game.pointWonBy("jorge");
    expect(game.status()).to.equal(
      "jorge tiene advantage, carlitos tiene 40 puntos",
    );
  });

  it("should return that they go back to deuce", () => {
    game.pointWonBy("carlitos");
    expect(game.status()).to.equal(
      "jorge tiene 40 puntos, carlitos tiene 40 puntos, estan en deuce",
    );
  });

  it("should return a winner", () => {
    game.pointWonBy("carlitos");
    game.pointWonBy("carlitos");
    expect(game.status()).to.equal("carlitos gano");
  });
});
