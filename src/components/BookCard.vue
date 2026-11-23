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
.book-card { transition: transform 0.15s, box-shadow 0.15s; background: var(--color-surface); border-radius: var(--radius);
  box-shadow: var(--shadow); border: 1px solid var(--color-border); overflow: hidden; height: 100%; }
.book-card__cover { display: block; width: 100%; aspect-ratio: 2 / 3; object-fit: contain;
  padding: var(--space-4); background: var(--color-tint); }
.book-card__body { padding: var(--space-4); }
.book-card__title { margin: 0 0 var(--space-1); font-size: var(--fs-300); }
.book-card__author, .book-card__meta { margin: 0; color: var(--color-muted); }
.book-card__status { display: inline-block; margin: var(--space-2) 0; padding: 0.125rem 0.75rem;
  border-radius: 999px; font-size: 0.875rem; font-weight: 700; background: #e1f1ea; color: var(--color-success); }
.book-card__status--off { background: #fbe1df; color: var(--color-danger); }
.book-card__fav { font: inherit; cursor: pointer; background: none; color: var(--color-primary);
  border: 1px solid var(--color-primary); border-radius: var(--radius); padding: var(--space-1) var(--space-2); }
.book-card__fav[aria-pressed='true'] { background: var(--color-primary); color: var(--color-primary-contrast); }
.book-card:hover { transform: translateY(-3px); box-shadow: 0 10px 28px rgba(43, 29, 58, 0.16); }
.book-card__title a { text-decoration: none; }
.book-card__title a:hover { text-decoration: underline; }
@media (prefers-reduced-motion: reduce) { .book-card { transition: none; } .book-card:hover { transform: none; } }
</style>
