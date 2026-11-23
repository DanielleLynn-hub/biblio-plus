<script setup>
import { ref, computed, onMounted } from 'vue'
import { useBooks } from '@/composables/useBooks'
import { useFavorites } from '@/composables/useFavorites'
import SearchBar from '@/components/SearchBar.vue'
import BookList from '@/components/BookList.vue'
import BookListSkeleton from '@/components/BookListSkeleton.vue'

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
    <p class="hero__eyebrow">Bibliothèque municipale</p>
    <h1>Bienvenue à la bibliothèque</h1>
    <p>Trouvez un livre en quelques secondes et vérifiez s’il est disponible avant de venir.</p>
    <SearchBar v-model="query" />
  </section>
  <section class="page" aria-labelledby="coeur">
    <h2 id="coeur">Coups de cœur</h2>
    <BookListSkeleton v-if="loading" />
    <div v-else-if="error" role="alert">
      <p>{{ error }}</p>
      <button type="button" @click="load">Réessayer</button>
    </div>
    <p v-else-if="!featured.length">Aucun résultat.</p>
    <BookList v-else :books="featured" :favorites="favorites" @toggle-favorite="toggleFavorite" />
  </section>
</template>

<style scoped>
.hero { padding: calc(var(--space-8) * 1.5) var(--gutter); color: #fbeaf0;
  background-color: var(--color-ink);
  background-image: linear-gradient(135deg, var(--color-ink) 0%, var(--color-ink-soft) 100%); }
.hero__eyebrow { margin: 0 0 var(--space-2); color: var(--color-accent); font-weight: 700;
  letter-spacing: 0.15em; text-transform: uppercase; font-size: 0.875rem; }
.hero h1 { font-size: var(--fs-800); margin: 0 0 var(--space-2); color: #ffffff; }
.hero p { max-width: 38rem; }
</style>
