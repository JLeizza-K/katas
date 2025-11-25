const POINTS = ["0", "15", "30", "40"];

type StatusHandler = (
  player1: Player,
  player2: Player,
  winner: string | null,
) => string | null;

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
  private handlers: StatusHandler[];

  constructor() {
    this.handlers = [
      this.handleWinner,
      this.handleDeuce,
      this.handleAdvantage,
      this.handleRegular,
    ];
  }
  evaluate(player1: Player, player2: Player, winner: string | null): string {
    for (const handler of this.handlers) {
      const result = handler(player1, player2, winner);
      if (result) {
        return result;
      }
    }
  }

  private handleDeuce: StatusHandler = (_, __, winner) => {
    if (winner) {
      return `${winner} gano`;
    }
    return null;
  };
  private handleWinner: StatusHandler = (player1, player2, _) => {
    if (
      player1.points === 3 &&
      player2.points === 3 &&
      !player1.advantage &&
      !player2.advantage
    ) {
      return `${player1.name} tiene 40 puntos, ${player2.name} tiene 40 puntos, estan en deuce`;
    }
    return null;
  };
  private handleAdvantage: StatusHandler = (player1, player2, _) => {
    if (player1.points === 3 && player2.points === 3) {
      if (player1.advantage) {
        return `${player1.name} tiene advantage, ${player2.name} tiene 40 puntos`;
      } else if (player2.advantage) {
        return `${player2.name} tiene advantage, ${player2.name} tiene 40 puntos`;
      }
    }
    return null;
  };

  private handleRegular: StatusHandler = (player1, player2, _) => {
    return `${player1.name} tiene ${POINTS[player1.points]} puntos, ${player2.name} tiene ${POINTS[player2.points]} puntos`;
  };
}
