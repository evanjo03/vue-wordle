export type LetterStatus = "correct" | "incorrect" | "misplaced" | "empty";

export type LetterGuess = {
  value: string;
  status: LetterStatus;
  index: number;
};

export type WordGuess = {
  letters: LetterGuess[];
  complete: boolean;
  number: number;
  correct: boolean;
};
