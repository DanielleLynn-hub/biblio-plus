import { ref } from 'vue'
import SearchBar from './SearchBar.vue'

export default {
  title: 'Composants/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  parameters: {
    docs: { description: { component: 'Champ de recherche avec `v-model` (defineModel).' } },
  },
  render: () => ({
    components: { SearchBar },
    setup: () => ({ query: ref('') }),
    template: '<div><SearchBar v-model="query" /><p>Saisie : « {{ query }} »</p></div>',
  }),
}

export const Defaut = {}
