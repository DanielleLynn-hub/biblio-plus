import BookCard from './BookCard.vue'

const book = {
  id: 1,
  title: 'Le Petit Prince',
  author: 'Antoine de Saint-Exupéry',
  category: 'Roman',
  year: 1943,
  available: true,
  cover: '/covers/petit-prince.webp',
}

export default {
  title: 'Composants/BookCard',
  component: BookCard,
  tags: ['autodocs'],
  args: { book, favorite: false },
  argTypes: { onToggleFavorite: { action: 'toggle-favorite' } },
  render: (args) => ({
    components: { BookCard },
    setup: () => ({ args }),
    template: '<div style="max-width: 15rem"><BookCard v-bind="args" /></div>',
  }),
}

export const Disponible = {}
export const Emprunte = { args: { book: { ...book, id: 2, title: 'Germinal', author: 'Émile Zola', available: false, cover: '/covers/germinal.webp' } } }
export const EnFavori = { args: { favorite: true } }
