<script setup>
import { toRef } from 'vue'
import { useOpenLibrary } from '@/composables/useOpenLibrary'
import BaseCard from './BaseCard.vue'
import BaseButton from './BaseButton.vue'

const props = defineProps({
  query: { type: String, default: '' },
})

const { results, loading, error, active, retry } = useOpenLibrary(toRef(props, 'query'))
</script>

<template>
  <section class="ol" aria-labelledby="ol-title">
    <h2 id="ol-title">Aussi sur Open Library</h2>
    <p class="ol__note">
      Ces ouvrages viennent du catalogue mondial
      <a href="https://openlibrary.org" target="_blank" rel="noopener noreferrer">Open Library</a>
      (nouvel onglet) et ne sont pas forcément disponibles à la bibliothèque.
    </p>

    <p v-if="!active" class="ol__hint">
      Tapez au moins 3 lettres dans la recherche du catalogue pour chercher aussi parmi les ouvrages d’Open Library.
    </p>
    <p v-else-if="loading" role="status">Recherche sur Open Library…</p>
    <div v-else-if="error" role="alert">
      <p>{{ error }}</p>
      <BaseButton @click="retry">Réessayer</BaseButton>
    </div>
    <p v-else-if="!results.length" role="status">Aucun ouvrage trouvé sur Open Library.</p>
    <ul v-else class="ol__list">
      <li v-for="book in results" :key="book.id">
        <BaseCard>
          <template v-if="book.cover" #media>
            <img class="ol__cover" :src="book.cover" width="180" height="270"
              :alt="'Couverture de ' + book.title" loading="lazy" />
          </template>
          <h3 class="ol__title">
            <a :href="book.url" target="_blank" rel="noopener noreferrer">
              {{ book.title }}<span class="sr-only"> (nouvel onglet)</span>
            </a>
          </h3>
          <p class="ol__meta">{{ book.author }}<template v-if="book.year"> · {{ book.year }}</template></p>
        </BaseCard>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.ol { margin-top: var(--space-8); }
.ol__hint { padding: var(--space-4); background: var(--color-tint); border-radius: var(--radius); }
.ol__note { color: var(--color-muted); max-width: 40rem; }
.ol__list { list-style: none; margin: 0; padding: 0; display: grid; gap: var(--space-4);
  grid-template-columns: repeat(auto-fill, minmax(11rem, 1fr)); }
.ol__cover { display: block; width: 100%; aspect-ratio: 2 / 3; object-fit: contain;
  padding: var(--space-2); background: var(--color-tint); }
.ol__title { margin: 0 0 var(--space-1); font-size: var(--fs-400); }
.ol__meta { margin: 0; color: var(--color-muted); font-size: 0.875rem; }
</style>
