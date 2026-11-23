<script setup>
// Carte générique : slots nommés « media » et « footer », contenu principal par défaut
</script>

<template>
  <article class="base-card">
    <div v-if="$slots.media" class="base-card__media"><slot name="media" /></div>
    <div class="base-card__body"><slot /></div>
    <footer v-if="$slots.footer" class="base-card__footer"><slot name="footer" /></footer>
  </article>
</template>

<style scoped>
.base-card { height: 100%; overflow: hidden; background: var(--color-surface);
  border: 1px solid var(--color-border); border-radius: var(--radius); box-shadow: var(--shadow);
  transition: transform 0.15s, box-shadow 0.15s; }
.base-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-hover); }
.base-card__body { padding: var(--space-4); }
.base-card__footer { padding: 0 var(--space-4) var(--space-4); }
@media (prefers-reduced-motion: reduce) {
  .base-card { transition: none; }
  .base-card:hover { transform: none; }
}
</style>
