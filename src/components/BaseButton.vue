<script setup>
defineProps({
  variant: { type: String, default: 'primary' }, // primary | ghost
  to: { type: [String, Object], default: null }, // lien interne si renseigné
})
</script>

<template>
  <component :is="to ? 'RouterLink' : 'button'" :to="to" :class="['btn', 'btn--' + variant]">
    <slot />
  </component>
</template>

<style scoped>
.btn { display: inline-block; font: inherit; font-weight: 700; cursor: pointer; text-decoration: none;
  padding: var(--space-2) var(--space-6); border-radius: var(--radius); border: 2px solid var(--color-primary); }
.btn--primary { background: var(--color-primary); color: var(--color-primary-contrast); }
.btn--ghost { background: transparent; color: var(--color-primary); }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
</style>
