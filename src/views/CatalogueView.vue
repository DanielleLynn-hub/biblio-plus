<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useBooks } from '@/composables/useBooks'
import { useFavorites } from '@/composables/useFavorites'
import BookList from '@/components/BookList.vue'
import BaseButton from '@/components/BaseButton.vue'

const { books, loading, error, load } = useBooks()
onMounted(load)

const query = ref('')
const category = ref('')
const sort = ref('title')
const page = ref(1)
const { favorites, toggle: toggleFavorite } = useFavorites()
const PER_PAGE = 8

const categories = computed(() => [...new Set(books.value.map((b) => b.category))])

const filtered = computed(() =>
  books.value
    .filter((b) => !category.value || b.category === category.value)
    .filter((b) =>
      (b.title + ' ' + b.author).toLowerCase().includes(query.value.trim().toLowerCase()),
    )
    .sort((a, b) => (a[sort.value] > b[sort.value] ? 1 : -1)),
)
const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / PER_PAGE)))
const visible = computed(() =>
  filtered.value.slice((page.value - 1) * PER_PAGE, page.value * PER_PAGE),
)

watch([query, category, sort], () => (page.value = 1))
</script>

<template>
  <div class="page">
    <h1>Catalogue</h1>

    <div class="catalogue__controls">
      <div class="field">
        <label for="search">Rechercher</label>
        <input id="search" v-model="query" type="search" placeholder="Titre, auteur…" />
      </div>
      <div class="field">
        <label for="category">Catégorie</label>
        <select id="category" v-model="category">
          <option value="">Toutes</option>
          <option v-for="c in categories" :key="c">{{ c }}</option>
        </select>
      </div>
      <div class="field">
        <label for="sort">Trier par</label>
        <select id="sort" v-model="sort">
          <option value="title">Titre</option>
          <option value="author">Auteur</option>
          <option value="year">Année</option>
        </select>
      </div>
    </div>

    <p v-if="loading" role="status">Chargement…</p>
    <div v-else-if="error" role="alert">
      <p>{{ error }}</p>
      <BaseButton @click="load">Réessayer</BaseButton>
    </div>
    <p v-else-if="!filtered.length" role="status">Aucun résultat.</p>
    <template v-else>
      <h2 class="sr-only">Résultats</h2>
      <BookList :books="visible" :favorites="favorites" @toggle-favorite="toggleFavorite" />
      <nav class="catalogue__pagination" aria-label="Pagination">
        <BaseButton variant="ghost" :disabled="page === 1" @click="page--">Précédent</BaseButton>
        <span>Page {{ page }} / {{ pageCount }}</span>
        <BaseButton variant="ghost" :disabled="page === pageCount" @click="page++">Suivant</BaseButton>
      </nav>
    </template>
  </div>
</template>

<style scoped>
.catalogue__controls { display: flex; flex-wrap: wrap; gap: var(--space-4); align-items: end; }
.catalogue__pagination { display: flex; justify-content: center; align-items: center;
  gap: var(--space-4); margin-top: var(--space-6); }
</style>
