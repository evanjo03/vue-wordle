<template>
  <div id="root">
    <div class="row" v-for="guess in guesses" :key="guess.number">
      <div v-for="letter in guess.letters" class="letter" :key="letter.index">
        {{ letter.value }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { LetterGuess, WordGuess } from "@/types";

const TOTAL_GUESSES = 6;
const WORD_SIZE = 5;

export default {
  data: function () {
    return {
      guesses: [] as WordGuess[],
      currentGuessIndex: 0,
      currentLetterIndex: 0,
      word: "boats",
    };
  },
  mounted: function () {
    this.$_setInitialGuesses();
    this.$_addGlobalEventListeners();
  },
  destroyed: function () {
    this.$_removeGlobalEventListeners();
  },
  methods: {
    $_removeGlobalEventListeners: function () {
      document.body.removeEventListener("keydown", this.$_onKeyPressed);
    },
    $_addGlobalEventListeners: function () {
      document.body.addEventListener("keydown", this.$_onKeyPressed);
    },
    $_onKeyPressed: function (e: KeyboardEvent) {
      if (e.key == "Enter") {
        alert("enter");
        return;
      }

      const alteredGuess = this.guesses[this.currentGuessIndex];
      if (e.key == "Backspace") {
        if (this.currentLetterIndex !== WORD_SIZE) {
          console.log("here");
          this.currentLetterIndex--;
        }
        if (alteredGuess.letters[this.currentLetterIndex]) {
          alteredGuess.letters[this.currentLetterIndex].value = "";
        }
      } else if (/^[A-Z]$/i.test(e.key?.toUpperCase())) {
        alteredGuess.letters[this.currentLetterIndex].value =
          e.key.toUpperCase();
        if (this.currentLetterIndex < 4) {
          this.currentLetterIndex++;
        }
      }
    },
    $_setInitialGuesses: function () {
      const state: WordGuess[] = [];
      for (let i = 0; i < TOTAL_GUESSES; i++) {
        const letters = [];
        for (let j = 0; j < 5; j++) {
          const newLetterGuess: LetterGuess = {
            value: "a",
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
};
</script>

<style scoped>
#root {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 0.5rem;
}

.letter {
  display: grid;
  place-items: center;
  text-transform: capitalize;
  min-width: 4rem;
  min-height: 4rem;
  border: 2px solid var(--color-border);
}

.row {
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}
</style>
