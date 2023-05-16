<script lang="ts">
import type { WordGuess } from "@/types";
import type { PropType } from "vue";
import LetterCell from "./LetterCell.vue";
export default {
  props: {
    guess: {
      type: Object as PropType<WordGuess>,
    },
  },
  components: {
    LetterCell,
  },
};
</script>

<template>
  <div id="guessRow">
    <LetterCell
      v-for="letter in guess?.letters ?? []"
      :key="letter.index"
      :letter="letter"
    />
  </div>
</template>

<style scoped>
#guessRow {
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}
</style>
