import BookList from './BookList.vue'

const books = [
  { id: 1, title: 'Le Petit Prince', author: 'Antoine de Saint-Exupéry', category: 'Roman', year: 1943, available: true, cover: '/covers/petit-prince.webp' },
  { id: 2, title: 'Germinal', author: 'Émile Zola', category: 'Roman', year: 1885, available: false, cover: '/covers/germinal.webp' },
  { id: 7, title: 'Matilda', author: 'Roald Dahl', category: 'Jeunesse', year: 1988, available: true, cover: '/covers/matilda.webp' },
  { id: 5, title: "Harry Potter à l'école des sorciers", author: 'J. K. Rowling', category: 'Jeunesse', year: 1997, available: false, cover: '/covers/harry-potter.webp' },
]

export default {
  title: 'Composants/BookList',
  component: BookList,
  tags: ['autodocs'],
  args: { books, favorites: [] },
  argTypes: { onToggleFavorite: { action: 'toggle-favorite' } },
}

export const Liste = {}
export const AvecFavoris = { args: { favorites: [1, 7] } }
