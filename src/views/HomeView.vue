<script setup>
import { ref, computed, onMounted } from 'vue'
import { useBooks } from '@/composables/useBooks'
import { useFavorites } from '@/composables/useFavorites'
import SearchBar from '@/components/SearchBar.vue'
import BookList from '@/components/BookList.vue'

const { books, loading, error, load } = useBooks()
const query = ref('')
const { favorites, toggle: toggleFavorite } = useFavorites()

const featured = computed(() =>
  books.value
    .filter((b) => (b.title + ' ' + b.author).toLowerCase().includes(query.value.trim().toLowerCase()))
    .slice(0, 8),
)

onMounted(load)
</script>

<template>
  <section class="hero">
    <h1>Bienvenue à la bibliothèque</h1>
    <p>Trouvez un livre en quelques secondes et vérifiez s’il est disponible avant de venir.</p>
    <SearchBar v-model="query" />
  </section>
  <section class="page" aria-labelledby="coeur">
    <h2 id="coeur">Coups de cœur</h2>
    <p v-if="loading" role="status">Chargement…</p>
    <div v-else-if="error" role="alert">
      <p>{{ error }}</p>
      <button type="button" @click="load">Réessayer</button>
    </div>
    <p v-else-if="!featured.length">Aucun résultat.</p>
    <BookList v-else :books="featured" :favorites="favorites" @toggle-favorite="toggleFavorite" />
  </section>
</template>

<style scoped>
.hero { padding: var(--space-8) var(--space-8) calc(var(--space-8) * 1.5); background: var(--color-brand);
  color: var(--color-on-brand); }
.hero h1 { font-size: var(--fs-800); margin: 0 0 var(--space-2); }
</style>
