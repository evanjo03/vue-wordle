<template>
  <div id="gameBoard">
    <GuessRow v-for="guess in guesses" :key="guess.number" :guess="guess" />
  </div>
</template>

<script lang="ts">
import type { LetterGuess, WordGuess } from "@/types";
import GuessRow from "./GuessRow.vue";
import { getWord } from "@/utils/word-utils";
import { defineComponent } from "vue";

const TOTAL_GUESSES = 6;
const WORD_SIZE = 5;

export default defineComponent({
  data: function () {
    return {
      guesses: [] as WordGuess[],
      currentGuessIndex: 0,
      currentLetterIndex: 0,
      word: "",
    };
  },
  components: {
    GuessRow,
  },
  mounted: function () {
    this.$_initializeGame();
  },
  destroyed: function () {
    this.$_removeGlobalEventListeners();
  },
  methods: {
    $_initializeGame: function () {
      this.$_setInitialGuesses();
      this.$_addGlobalEventListeners();
      this.word = getWord();
      this.currentLetterIndex = 0;
      this.currentGuessIndex = 0;
    },
    $_removeGlobalEventListeners: function () {
      document.body.removeEventListener("keydown", this.$_onKeyPressed);
    },
    $_addGlobalEventListeners: function () {
      document.body.addEventListener("keydown", this.$_onKeyPressed);
    },
    $_onKeyPressed: function (e: KeyboardEvent) {
      const alteredGuess = this.guesses[this.currentGuessIndex];
      if (e.key == "Enter") {
        if (this.currentLetterIndex !== 5) {
          return;
        }
        this.$_checkWord();
        if (this.currentGuessIndex < 5) {
          this.currentGuessIndex++;
          this.currentLetterIndex = 0;
        }

        return;
      }

      if (e.key == "Backspace") {
        if (this.currentLetterIndex > 0) {
          this.currentLetterIndex--;
        }
        if (alteredGuess.letters[this.currentLetterIndex]) {
          alteredGuess.letters[this.currentLetterIndex].value = "";
        }
      } else if (
        /^[A-Z]$/i.test(e.key?.toUpperCase()) &&
        this.currentLetterIndex < WORD_SIZE
      ) {
        const letter = alteredGuess.letters[this.currentLetterIndex];
        letter.value = e.key.toUpperCase();
        if (this.currentLetterIndex < WORD_SIZE) {
          this.currentLetterIndex++;
        }
      }
    },
    $_checkWord() {
      const alteredGuess = this.guesses[this.currentGuessIndex];
      alteredGuess.letters.map((currentLetter) => {
        const correctLetter = this.word[currentLetter.index];
        if (correctLetter == currentLetter.value) {
          currentLetter.status = "correct";
        } else if (this.word.includes(currentLetter.value)) {
          currentLetter.status = "misplaced";
        } else {
          currentLetter.status = "incorrect";
        }
      });

      const letterStatuses = alteredGuess.letters.map(
        (letter) => letter.status
      );

      if (letterStatuses.every((status) => status === "correct")) {
        setTimeout(() => {
          alert("you win");
          this.$_initializeGame();
        });
        return;
      }

      if (this.currentGuessIndex === 5) {
        setTimeout(() => {
          alert("you lose");
          this.$_initializeGame();
        });
      }
    },
    $_setInitialGuesses: function () {
      const state: WordGuess[] = [];
      for (let i = 0; i < TOTAL_GUESSES; i++) {
        const letters = [];
        for (let j = 0; j < 5; j++) {
          const newLetterGuess: LetterGuess = {
            value: "",
            status: "empty",
            index: j,
          };
          letters.push(newLetterGuess);
        }

        state.push({
          letters,
          number: i,
          complete: false,
          correct: false,
        });
      }

      this.guesses = state;
    },
  },
});
</script>

<style scoped>
#gameBoard {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
