<template>
  <div
    :class="{
      cell: true,
      correct: letter?.status === 'correct',
      incorrect: letter?.status === 'incorrect',
      misplaced: letter?.status === 'misplaced',
      'has-value': !!letter?.value,
    }"
  >
    {{ letter?.value }}
  </div>
</template>

<script lang="ts">
import type { LetterGuess } from "@/types";
import type { PropType } from "vue";

export default {
  props: {
    letter: Object as PropType<LetterGuess>,
  },
};
</script>

<style scoped>
.cell {
  display: grid;
  place-items: center;
  text-transform: capitalize;
  min-width: 4rem;
  min-height: 4rem;
  font-weight: 700;
  border: 2px solid var(--color-border);
}

.has-value {
  border-color: var(--color-active);
}

.correct {
  background: var(--color-correct);
  border-color: var(--color-correct);
  color: var(--white);
}
.incorrect {
  background: var(--color-incorrect);
  border-color: var(--color-incorrect);
  color: var(--white);
}
.misplaced {
  background: var(--color-misplaced);
  border-color: var(--color-misplaced);
  color: var(--white);
}
</style>
