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
  private handlers: Array<typeof StatusHandler>;
  handleWinner = WinnerHandler;
  handleDeuce = DeuceHandler;
  handleAdvantage = AdvantageHandler;
  handleRegular = RegularHandler;

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
      const currentHandler = new handler(player1, player2, winner);
      const result = currentHandler.handle();
      if (result) {
        return result;
      }
    }
  }
}

class StatusHandler {
  player1: Player;
  player2: Player;
  winner: string | null = null;
  constructor(player1: Player, player2: Player, winner: string | null) {
    this.player1 = player1;
    this.player2 = player2;
    this.winner = winner;
  }
  handle(): string | null {
    return null;
  }
}

class WinnerHandler extends StatusHandler {
  handle() {
    if (this.winner) {
      return `${this.winner} gano`;
    }
    return null;
  }
}
class DeuceHandler extends StatusHandler {
  handle() {
    if (
      this.player1.points === 3 &&
      this.player2.points === 3 &&
      !this.player1.advantage &&
      !this.player2.advantage
    ) {
      return `${this.player1.name} tiene 40 puntos, ${this.player2.name} tiene 40 puntos, estan en deuce`;
    }
    return null;
  }
}
class AdvantageHandler extends StatusHandler {
  handle() {
    if (this.player1.points === 3 && this.player2.points === 3) {
      if (this.player1.advantage) {
        return `${this.player1.name} tiene advantage, ${this.player2.name} tiene 40 puntos`;
      } else if (this.player2.advantage) {
        return `${this.player2.name} tiene advantage, ${this.player1.name} tiene 40 puntos`;
      }
    }
    return null;
  }
}

class RegularHandler extends StatusHandler {
  handle() {
    return `${this.player1.name} tiene ${POINTS[this.player1.points]} puntos, ${this.player2.name} tiene ${POINTS[this.player2.points]} puntos`;
  }
}
