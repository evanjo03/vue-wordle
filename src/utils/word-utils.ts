import words from "../assets/words";

export function getWord(): string {
  return words[Math.floor(Math.random() * words.length)].toUpperCase();
}
