<script setup>
defineProps({ count: { type: Number, default: 8 } })
</script>

<template>
  <div role="status">
    <span class="sr-only">Chargement…</span>
    <ul class="skeleton-list" aria-hidden="true">
      <li v-for="n in count" :key="n" class="skeleton">
        <div class="skeleton__cover"></div>
        <div class="skeleton__line"></div>
        <div class="skeleton__line skeleton__line--short"></div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.skeleton-list { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--space-4);
  grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr)); }
.skeleton { padding: var(--space-4); background: var(--color-surface); border: 1px solid var(--color-border);
  border-radius: var(--radius); display: grid; gap: var(--space-2); }
.skeleton__cover, .skeleton__line { background: var(--color-tint); border-radius: var(--space-2);
  animation: pulse 1.4s ease-in-out infinite; }
.skeleton__cover { aspect-ratio: 2 / 3; }
.skeleton__line { height: 1rem; }
.skeleton__line--short { width: 60%; }
@keyframes pulse { 50% { opacity: 0.5; } }
@media (prefers-reduced-motion: reduce) {
  .skeleton__cover, .skeleton__line { animation: none; }
}
</style>
