import { shuffle } from 'lodash';

export const GenerateVerificationCode = () => {
    const TOTAL_NUMBERS = 4;
    const TOTAL_LETTERS = 2;
    const NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const LETTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    const code = [];

    for (let i = 0; i < TOTAL_NUMBERS; ++i) {
        code.push(NUMBERS[Math.floor(Math.random() * NUMBERS.length)]);
    }
    for (let i = 0; i < TOTAL_LETTERS; ++i) {
        code.push(LETTERS[Math.floor(Math.random() * LETTERS.length)]);
    }

    return shuffle(code).join('');
}