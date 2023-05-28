import {
  ConvertToHours,
  ConvertToMinutes,
  ConvertToSeconds,
  ConvertOpacityToHEXRepresentation,
} from "../utils/convert";

import {
  checkEmail,
  checkPassword,
  checkPasswordSync,
  isInputEmpty,
} from "../utils/isValid";
import { OPACITY_TO_HEX } from "../consts/color";

describe("Convert methods should convert properly", () => {
  const SECONDS = 7260;

  it("Converts seconds to hours", () => {
    expect(ConvertToHours(SECONDS)).toEqual("02");
  });

  it("Converts seconds to minutes", () => {
    expect(ConvertToMinutes(SECONDS)).toEqual("01");
  });

  it("Properly gets seconds", () => {
    expect(ConvertToSeconds(SECONDS)).toEqual("00");
  });

  for (let [opacity, HEXValue] of OPACITY_TO_HEX) {
    it(`Converts ${opacity} opacity into ${HEXValue} HEX representation`, () => {
      expect(ConvertOpacityToHEXRepresentation(opacity)).toEqual(HEXValue);
    });
  }
});

describe("Validation methods should check validation properly", () => {
  const data = {
    email: {
      correct: "test@test.com",
      incorrect: "test-test.com",
    },
    password: {
      invalid: "1234",
      // we have three types of valid password - we will check only one
      valid: "t2T_223T-1",
    },
  };

  const input = document.createElement("input");

  it("Email should be valid", () => {
    expect(
      checkEmail(data.email.correct, /^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    ).toEqual(true);
  });

  it("Email should be invalid", () => {
    expect(
      checkEmail(data.email.incorrect, /^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    ).toEqual(false);
  });

  it("Password should be weak", () => {
    expect(
      checkPassword(data.password.invalid, 6, {
        atLeastOneDigit: true,
        atLeastOneSymbol: true,
        atLeastOneUpperCaseLetter: true,
      })
    ).toEqual(false);
  });

  it("Password should be strong", () => {
    expect(
      checkPassword(data.password.valid, 6, {
        atLeastOneDigit: true,
        atLeastOneSymbol: true,
        atLeastOneUpperCaseLetter: true,
      })
    ).toEqual(true);
  });

  it("Password sync should be falsy", () => {
    expect(
      checkPasswordSync(data.password.invalid, data.password.valid)
    ).toEqual(false);
  });

  it("Password sync should be truly", () => {
    expect(checkPasswordSync(data.password.valid, data.password.valid)).toEqual(
      true
    );
  });

  it("Input should be empty", () => {
    expect(isInputEmpty(input)).toEqual(true);
  });

  it("input should not be empty", () => {
    input.value = "test value";
    expect(isInputEmpty(input)).toEqual(false);
  });
});
