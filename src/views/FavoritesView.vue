<script setup>
import { computed, onMounted } from 'vue'
import { useBooks } from '@/composables/useBooks'
import { useFavorites } from '@/composables/useFavorites'
import BookList from '@/components/BookList.vue'
import BookListSkeleton from '@/components/BookListSkeleton.vue'
import BaseButton from '@/components/BaseButton.vue'

const { books, loading, error, load } = useBooks()
const { favorites, toggle } = useFavorites()
const favoriteBooks = computed(() => books.value.filter((b) => favorites.value.includes(b.id)))

onMounted(load)
</script>

<template>
  <div class="page">
    <h1>Mes favoris</h1>
    <BookListSkeleton v-if="loading" />
    <div v-else-if="error" role="alert">
      <p>{{ error }}</p>
      <BaseButton @click="load">Réessayer</BaseButton>
    </div>
    <div v-else-if="!favoriteBooks.length">
      <p role="status">Vous n’avez pas encore de favoris.</p>
      <BaseButton to="/catalogue">Parcourir le catalogue</BaseButton>
    </div>
    <div v-else>
      <h2 class="sr-only">Livres favoris</h2>
      <BookList :books="favoriteBooks" :favorites="favorites" @toggle-favorite="toggle" />
    </div>
  </div>
</template>
