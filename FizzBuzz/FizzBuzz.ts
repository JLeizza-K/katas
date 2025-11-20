export class Game {
  constructor(public dividers: { name: string; divider: number }[]) {
    this.dividers = dividers;
  }

  fizzBuzz(n: number) {
    const results = [];

    this.dividers.forEach((item) => {
      let count = 0;

      switch (true) {
        case n === 0:
          throw new Error("The number should be different than 0");

        case n < item.divider:
          throw new Error("The number should be bigger than the divider");

        case n > item.divider:
          count = Math.floor(n / item.divider);
          results.push(`${item.name} count is ${count}`);
          break;
      }
    });

    return results;
  }
}
