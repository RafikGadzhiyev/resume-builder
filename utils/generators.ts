import {shuffle} from "lodash";

export const GenerateNumberFromTheRange = (start: number, end: number): number => {
	return Math.floor(Math.random() * (end - start) + start);
}

export const GenerateVerificationCode = (isLettersIncludes: boolean, amount: number) => {
	const NUMBERS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
	const LETTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

	const validSymbols = [...NUMBERS];
	if (isLettersIncludes) {
		validSymbols.push(...LETTERS);
	}

	const code: string[] = [];

	for (let i = 0; i < amount; ++i) {
		code.push(validSymbols[GenerateNumberFromTheRange(0, validSymbols.length)]);
	}

	return shuffle(code).join("");
};
