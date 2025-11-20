import { expect } from "chai";

import { RomanNumbers } from "./RomanNumbers.ts";

describe("romanNumbers", () => {
  function doTest(sut, expected) {
    it(`given ${sut} then I get ${expected}`, () => {
      const roman = new RomanNumbers();
      expect(roman.romanNumbers(sut)).to.equal(expected);
    });
  }

  doTest(1, "I");
  doTest(2, "II");
  doTest(3, "III");
  doTest(4, "IV");
  doTest(5, "V");
  doTest(6, "VI");
  doTest(7, "VII");
  doTest(9, "IX");
  doTest(10, "X");
  doTest(11, "XI");
  doTest(13, "XIII");
  doTest(15, "XV");
  doTest(17, "XVII");
  doTest(37, "XXXVII");
  doTest(53, "LIII");
  doTest(1240, "MCCXL");
  doTest(404, "CDIV");
  doTest(5300, "MMMMMCCC");
  doTest(5949, "MMMMMCMXLIX");
});
