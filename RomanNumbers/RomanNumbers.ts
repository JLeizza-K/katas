/*const LETTERS = [
  { number: 1000, symbol: "M" },
  { number: 900, symbol: "CM" },
  { number: 500, symbol: "D" },
  { number: 400, symbol: "CD" },
  { number: 100, symbol: "C" },
  { number: 90, symbol: "XC" },
  { number: 50, symbol: "L" },
  { number: 40, symbol: "XL" },
  { number: 10, symbol: "X" },
  { number: 9, symbol: "IX" },
  { number: 5, symbol: "V" },
  { number: 4, symbol: "IV" },
  { number: 1, symbol: "I" },
]; */
const LETTERS = [
  { number: 1000, symbol: "M" },
  { number: 500, symbol: "D" },
  { number: 100, symbol: "C" },
  { number: 50, symbol: "L" },
  { number: 10, symbol: "X" },
  { number: 5, symbol: "V" },
  { number: 1, symbol: "I" },
];

export class RomanNumbers {
  romanNumbers(n: number) {
    const first = this.firstNumber(n);
    return this.secondNumber(first);
  }

  firstNumber(aNumber: number) {
    let result = "";
    LETTERS.forEach((letter) => {
      const quantity = Math.floor(aNumber / letter.number);
      for (let i = 0; i < quantity; i++) {
        result += letter.symbol;
      }
      aNumber -= letter.number * quantity;
    });
    return result;
  }

  secondNumber(roman: string) {
    return roman
      .replace(/DCCCC/, "CM")
      .replace(/CCCC/, "CD")
      .replace(/LXXXX/, "XC")
      .replace(/XXXX/, "XL")
      .replace(/VIIII/, "IX")
      .replace(/IIII/, "IV");
  }
}
