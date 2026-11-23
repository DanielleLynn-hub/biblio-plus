<template>
  <footer class="app-footer">
    <p><strong>Bibliothèque municipale</strong> — ouvert du mardi au samedi, 10h–18h</p>
    <p><RouterLink to="/contact">Nous contacter</RouterLink></p>
  </footer>
</template>

<style scoped>
.app-footer { margin-top: var(--space-8); padding: var(--space-6); text-align: center;
  background: var(--color-primary); color: var(--color-primary-contrast); }
.app-footer p { margin: var(--space-1) 0; }
.app-footer a { color: inherit; }
.app-footer :focus-visible { outline-color: var(--color-primary-contrast); }
</style>
