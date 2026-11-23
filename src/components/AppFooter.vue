<template>
  <footer class="app-footer">
    <p><strong>Bibliothèque municipale</strong> — ouvert du mardi au samedi, 10h–18h</p>
    <p><RouterLink to="/contact">Nous contacter</RouterLink></p>
  </footer>
</template>

<style scoped>
.app-footer { padding: var(--space-6) var(--gutter); text-align: center;
  background: var(--color-ink); color: var(--color-on-ink); border-top: 3px solid var(--color-accent); }
.app-footer p { margin: var(--space-1) 0; }
.app-footer a { color: inherit; }
.app-footer :focus-visible { outline-color: var(--color-on-ink); }
</style>
