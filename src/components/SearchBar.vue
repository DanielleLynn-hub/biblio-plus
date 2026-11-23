<script setup>
const model = defineModel({ type: String, default: '' })
</script>

<template>
  <form class="search" role="search" @submit.prevent>
    <label for="q" class="search__label">Rechercher un livre</label>
    <input id="q" v-model="model" class="search__input" type="search" placeholder="Titre, auteur…" />
  </form>
</template>

<style scoped>
.search__label { display: block; margin-bottom: var(--space-1); font-weight: 700; }
.search__input { width: 100%; max-width: 32rem; font: inherit; padding: var(--space-2) var(--space-4);
  border: 1px solid var(--color-muted); border-radius: var(--radius); background: var(--color-surface); color: var(--color-text); }
</style>
