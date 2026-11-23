import { setup } from '@storybook/vue3-vite'
import { createRouter, createMemoryHistory } from 'vue-router'
import '../src/assets/tokens.css'
import '../src/assets/base.css'

// Routeur factice pour les RouterLink des composants
const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', name: 'home', component: { template: '<div />' } },
    { path: '/livres/:id', name: 'book', component: { template: '<div />' } },
    { path: '/:pathMatch(.*)*', component: { template: '<div />' } },
  ],
})

setup((app) => {
  app.use(router)
})

const applyTheme = (theme) => {
  document.documentElement.dataset.theme = theme
}

export const globalTypes = {
  theme: {
    description: 'Thème',
    toolbar: {
      title: 'Thème',
      icon: 'paintbrush',
      items: [
        { value: 'light', title: 'Clair' },
        { value: 'dark', title: 'Sombre' },
      ],
      dynamicTitle: true,
    },
  },
}

export const initialGlobals = { theme: 'light' }

export const decorators = [
  (story, context) => {
    applyTheme(context.globals.theme)
    return { components: { story }, template: '<div style="padding: 1rem; background: var(--color-bg)"><story /></div>' }
  },
]

export const parameters = {
  layout: 'fullscreen',
  backgrounds: { disabled: true },
}
