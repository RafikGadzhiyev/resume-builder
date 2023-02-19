import { IPasswordConstraints } from "../interfaces/utils.interface";

export const checkEmail = (email: string, regEx: RegExp) => regEx.test(email);
export const checkPassword = (password: string, minLength: number, constrains: IPasswordConstraints) => {
    if (password.length < minLength) return false;
    const symbols = [...password];
    if (
        symbols.every(symbol => symbol !== symbol.toUpperCase()) &&
        constrains.atLeastOneUpperCaseLetter === true
    ) return false;
    const SPECIAL_SYMBOLS = ['!', '@', '_', '=', '-', '?', '*', '$', '#'];
    let totalSpecial = 0;
    for (let specialSymbol of SPECIAL_SYMBOLS) {
        if (symbols.includes(specialSymbol)) {
            totalSpecial++;
            break;
        }
    }
    if (totalSpecial === 0 && constrains.atLeastOneSymbol === true) return false;
    if (password.replace(/\D/gi, '').length === 0 && constrains.atLeastOneDigit) return false;
    return true;
}
export const checkPasswordSync = (password: string, repeatedPassword: string) => password === repeatedPassword;