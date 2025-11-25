const POINTS = ["0", "15", "30", "40"];

export class Player {
  name: string;
  points: number;
  advantage: boolean;
  constructor(name: string) {
    this.name = name;
    this.points = 0;
    this.advantage = false;
  }
  addPoint() {
    if (this.points < 3) this.points++;
  }
  resetAdvantage() {
    this.advantage = false;
  }
}
export class Game {
  player1: Player;
  player2: Player;
  evaluator: Evaluate;
  winner: string | null = null;
  constructor(player1: Player, player2: Player) {
    this.player1 = player1;
    this.player2 = player2;
    this.evaluator = new Evaluate();
  }
  pointWonBy(name: string) {
    if (!(name === this.player1.name) && !(name === this.player2.name)) {
      throw new Error("Provided name does not match current players");
    }
    if (this.winner) return;

    const scorer = name === this.player1.name ? this.player1 : this.player2;
    const opponent = scorer === this.player1 ? this.player2 : this.player1;
    if (scorer.points === 3 && opponent.points === 3) {
      if (scorer.advantage) {
        this.winner = scorer.name;
        return;
      }

      if (opponent.advantage) {
        opponent.resetAdvantage();
        return;
      }
      scorer.advantage = true;
      return;
    }
    if (scorer.points === 3 && opponent.points <= 2) {
      this.winner = scorer.name;
      return;
    }
    scorer.addPoint();
  }
  status() {
    return this.evaluator.evaluate(this.player1, this.player2, this.winner);
  }
}
export class Evaluate {
  evaluate(player1: Player, player2: Player, winner: string | null): string {
    if (winner) return `${winner} gano`;

    if (this.isDeuce(player1, player2)) {
      return `${player1.name} tiene 40 puntos, ${player2.name} tiene 40 puntos, estan en deuce`;
    }
    if (this.isAdvantage(player1, player2)) {
      return `${player1.name} tiene advantage, ${player2.name} tiene 40 puntos`;
    }
    if (this.isAdvantage(player2, player1)) {
      return `${player2.name} tiene advantage, ${player1.name} tiene 40 puntos`;
    }
    return `${player1.name} tiene ${POINTS[player1.points]} puntos, ${player2.name} tiene ${POINTS[player2.points]} puntos`;
  }

  isDeuce(a: Player, b: Player) {
    return a.points === 3 && b.points === 3 && !a.advantage && !b.advantage;
  }
  isAdvantage(a: Player, b: Player) {
    return a.points === 3 && b.points === 3 && a.advantage && !b.advantage;
  }
}
