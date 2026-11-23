<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBooks } from '@/composables/useBooks'

const props = defineProps({ id: { type: String, default: '' } })
const router = useRouter()
const { books, loading, load } = useBooks()
const book = computed(() => books.value.find((b) => b.id === Number(props.id)))

onMounted(async () => {
  await load()
  if (!book.value) router.replace({ name: 'not-found' })
})
</script>

<template>
  <div class="page">
    <p v-if="loading" role="status">Chargement…</p>
    <article v-else-if="book" class="book">
      <img class="book__cover" :src="book.cover" width="200" height="300"
        :alt="'Couverture de ' + book.title" />
      <div>
        <h1>{{ book.title }}</h1>
        <p>{{ book.author }} · {{ book.category }} · {{ book.year }}</p>
        <p>{{ book.summary }}</p>
        <p class="book__status" :class="{ 'book__status--off': !book.available }">
          {{ book.available ? '✔ Disponible' : '✖ Emprunté' }}
        </p>
        <RouterLink to="/catalogue">← Retour au catalogue</RouterLink>
      </div>
    </article>
  </div>
</template>

<style scoped>
.book { display: flex; flex-wrap: wrap; gap: var(--space-6); }
.book__cover { border-radius: var(--radius); box-shadow: var(--shadow); background: var(--color-border); }
.book__status { font-weight: 700; color: var(--color-success); }
.book__status--off { color: var(--color-danger); }
</style>
