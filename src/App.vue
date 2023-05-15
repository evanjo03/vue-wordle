<script setup lang="ts">
// import HelloWold from "./components/HelloWorld.vue";
import GameBoard from "./components/GameBoard.vue";
</script>

<template>
  <div id="app">
    <header>
      <h2>Vue Wordle</h2>
    </header>
    <main>
      <GameBoard />
    </main>
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--color-background);
}

header {
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid var(--color-border);
}

main {
  display: grid;
  flex-grow: 1;
  place-items: center;
}
</style>
