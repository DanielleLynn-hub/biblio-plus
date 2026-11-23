<script setup>
defineProps({
  book: { type: Object, required: true },
  favorite: { type: Boolean, default: false },
})
const emit = defineEmits(['toggle-favorite'])
</script>

<template>
  <article class="book-card">
    <img class="book-card__cover" :src="book.cover" width="200" height="300"
      :alt="'Couverture de ' + book.title" loading="lazy" />
    <div class="book-card__body">
      <h3 class="book-card__title">
        <RouterLink :to="{ name: 'book', params: { id: book.id } }">{{ book.title }}</RouterLink>
      </h3>
      <p class="book-card__author">{{ book.author }}</p>
      <p class="book-card__meta">{{ book.category }} · {{ book.year }}</p>
      <p class="book-card__status" :class="{ 'book-card__status--off': !book.available }">
        {{ book.available ? '✔ Disponible' : '✖ Emprunté' }}
      </p>
      <button class="book-card__fav" type="button" :aria-pressed="favorite"
        @click="emit('toggle-favorite', book.id)">
        {{ favorite ? '★ Retirer des favoris' : '☆ Ajouter aux favoris' }}
      </button>
      <slot name="actions" />
    </div>
  </article>
</template>

<style scoped>
.book-card { background: var(--color-surface); border-radius: var(--radius);
  box-shadow: var(--shadow); overflow: hidden; height: 100%; }
.book-card__cover { display: block; width: 100%; aspect-ratio: 2 / 3; object-fit: contain;
  background: var(--color-border); }
.book-card__body { padding: var(--space-4); }
.book-card__title { margin: 0 0 var(--space-1); font-size: var(--fs-300); }
.book-card__author, .book-card__meta { margin: 0; color: var(--color-muted); }
.book-card__status { font-weight: 700; color: var(--color-success); }
.book-card__status--off { color: var(--color-danger); }
.book-card__fav { font: inherit; cursor: pointer; background: none; color: var(--color-primary);
  border: 1px solid var(--color-primary); border-radius: var(--radius); padding: var(--space-1) var(--space-2); }
.book-card__fav[aria-pressed='true'] { background: var(--color-primary); color: var(--color-primary-contrast); }
</style>
