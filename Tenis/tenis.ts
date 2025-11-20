const POINTS = {
  0: 0,
  1: 15,
  2: 30,
  3: 40,
};

export class Game {
  player1: Player;
  player2: Player;
  constructor(player1: Player, player2: Player) {
    this.player1 = player1;
    this.player2 = player2;
  }

  status() {
    let status = `${this.player1.name} tiene ${POINTS[this.player1.points]} puntos, ${this.player2.name} tiene ${POINTS[this.player2.points]} puntos`;
    if (this.player1.points >= 3 || this.player2.points >= 3) {
      status = this.handleMatchPoint(status);
    }
    return status;
  }

  handleMatchPoint(status) {
    switch (true) {
      case this.player1.points === this.player2.points:
        return `${status}, estan en deuce`;
      case this.player1.points > 3:
        this.player1.points = 3;
        break;

      case this.player2.points > 3:
        this.player2.points = 3;
        break;
    }
  }
}

export class Player {
  name: string;
  points: number;
  constructor(name: string) {
    this.name = name;
    this.points = 0;
  }

  addPoint() {
    this.points += 1;
  }
}
