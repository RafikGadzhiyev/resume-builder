import { IPasswordConstraints } from "../interfaces/utils.interface";

export const checkEmail = (email: string, regEx: RegExp) => regEx.test(email);
export const checkPhone = (phone: string, regEx: RegExp) => regEx.test(phone);
export const checkPassword = (
  password: string,
  minLength: number,
  constrains: IPasswordConstraints
) => {
  if (password.length < minLength) return false;
  const symbols = [...password];
  if (
    symbols.every((symbol) => symbol !== symbol.toUpperCase()) &&
    constrains.atLeastOneUpperCaseLetter
  )
    return false;
  const SPECIAL_SYMBOLS = ["!", "@", "_", "=", "-", "?", "*", "$", "#"];
  let totalSpecial = 0;
  for (let specialSymbol of SPECIAL_SYMBOLS) {
    if (symbols.includes(specialSymbol)) {
      totalSpecial++;
      break;
    }
  }
  if (totalSpecial === 0 && constrains.atLeastOneSymbol) return false;
  return !(
    password.replace(/\D/gi, "").length === 0 && constrains.atLeastOneDigit
  );
};
export const checkPasswordSync = (password: string, repeatedPassword: string) =>
  password === repeatedPassword;
export const isInputEmpty = (input: HTMLInputElement) =>
  input.value.length === 0;
export const InputValidation = (
  input: HTMLInputElement,
  isRequired: boolean
) => {
  if (!isRequired) return true; // If input is not required, that means input can be empty

  return !isInputEmpty(input);
};

export const isPropertyEmpty = (value: string) => value.length === 0;
