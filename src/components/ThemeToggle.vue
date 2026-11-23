<script setup>
import { useTheme } from '@/composables/useTheme'

const { isDark, toggle } = useTheme()
</script>

<template>
  <button class="theme-toggle" type="button" :aria-pressed="isDark" @click="toggle">
    <span aria-hidden="true">{{ isDark ? '☀' : '☾' }}</span>
    <span class="theme-toggle__label">{{ isDark ? 'Thème clair' : 'Thème sombre' }}</span>
  </button>
</template>

<style scoped>
.theme-toggle { display: inline-flex; align-items: center; gap: var(--space-2); font: inherit; cursor: pointer;
  padding: var(--space-1) var(--space-4); border-radius: 999px; background: transparent;
  color: inherit; border: 1px solid currentColor; }
.theme-toggle:hover { background: rgba(255, 255, 255, 0.12); }
</style>
