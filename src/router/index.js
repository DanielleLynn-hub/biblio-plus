import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', meta: { title: 'Accueil' }, component: HomeView },
    { path: '/catalogue', name: 'catalogue', meta: { title: 'Catalogue' }, component: () => import('@/views/CatalogueView.vue') },
    { path: '/livres/:id', name: 'book', meta: { title: 'Fiche livre' }, props: true, component: () => import('@/views/BookView.vue') },
    { path: '/favoris', name: 'favorites', meta: { title: 'Mes favoris' }, component: () => import('@/views/FavoritesView.vue') },
    { path: '/contact', name: 'contact', meta: { title: 'Contact' }, component: () => import('@/views/ContactView.vue') },
    { path: '/:pathMatch(.*)*', name: 'not-found', meta: { title: 'Page introuvable' }, component: () => import('@/views/NotFoundView.vue') },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

// Garde de navigation : le titre de l'onglet suit la page courante
router.beforeEach((to) => {
  document.title = (to.meta.title ? to.meta.title + ' · ' : '') + 'Biblio+'
})

export default router
