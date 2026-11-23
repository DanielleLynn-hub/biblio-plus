<script setup>
import { useFavorites } from '@/composables/useFavorites'
const { count } = useFavorites()
</script>

<template>
  <header class="app-header">
    <RouterLink to="/" class="app-header__logo">Biblio+</RouterLink>
    <nav aria-label="Navigation principale">
      <ul class="app-header__nav">
        <li><RouterLink to="/">Accueil</RouterLink></li>
        <li><RouterLink to="/catalogue">Catalogue</RouterLink></li>
        <li><RouterLink to="/favoris">Favoris ({{ count }})</RouterLink></li>
        <li><RouterLink to="/contact">Contact</RouterLink></li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.app-header { position: sticky; top: 0; z-index: 20; height: var(--header-h);
  display: flex; justify-content: space-between; align-items: center;
  padding: var(--space-4) var(--gutter); background: var(--color-ink); color: var(--color-on-ink);
  border-bottom: 3px solid var(--color-accent); }
.app-header a { color: inherit; text-decoration: none; }
.app-header__logo { font-family: var(--font-title); font-size: var(--fs-600); font-weight: 700;
  letter-spacing: 0.02em; color: #ffffff; }
.app-header__nav { display: flex; gap: var(--space-6); list-style: none; margin: 0; padding: 0; }
.app-header__nav a { padding-bottom: var(--space-1); border-bottom: 2px solid transparent; }
.app-header__nav a:hover { border-bottom-color: var(--color-lavender); }
.app-header__nav a.router-link-exact-active { font-weight: 700; color: #ffffff; border-bottom-color: var(--color-accent); }
.app-header :focus-visible { outline-color: var(--color-on-ink); }
</style>
