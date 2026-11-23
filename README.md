# Biblio+

Site de la bibliothèque municipale Biblio+ (Vue 3 + Vite) : catalogue, recherche, favoris, fiche livre et formulaire de contact.

- Site en ligne : https://biblio-plus-zjol.netlify.app
- Dépôt : https://github.com/DanielleLynn-hub/biblio-plus
- Storybook en ligne : https://biblio-plus-zjol.netlify.app/storybook/
- Cadrage et backlog : [docs/cadrage-et-backlog.md](docs/cadrage-et-backlog.md)
- Audit et revue de code : [REVUE.md](REVUE.md)

## Fonctionnalités

- Accueil avec recherche et « coups de cœur », catalogue avec recherche, filtre par catégorie, tri et pagination.
- Fiche détaillée d'un livre (`/livres/:id`), page 404, formulaire de contact validé et accessible.
- Favoris conservés dans le navigateur, avec compteur dans le menu (`/favoris`).
- Thème clair / sombre au choix de l'utilisateur (bouton dans l'en-tête, choix mémorisé ; par défaut, celui du navigateur).
- Recherche complémentaire dans l'API publique [Open Library](https://openlibrary.org/dev/docs/api/search) depuis le catalogue (dès 3 lettres).
- États de chargement (squelette), d'erreur (avec « Réessayer ») et de résultat vide.
- Titre de l'onglet mis à jour à chaque page, pages chargées à la demande (lazy loading).

## Installation et commandes

```sh
npm install
npm run dev              # serveur de développement : http://localhost:5173
npm run build            # version de production dans dist/
npm run preview          # prévisualiser la version de production
npm run test:unit        # tests unitaires (Vitest)
npm run lint             # ESLint + Oxlint
npm run storybook        # documentation des composants : http://localhost:6006
npm run build:netlify    # site + Storybook (dist/storybook), comme sur Netlify
```

## Structure

```
src/
  assets/       tokens.css (design tokens, thèmes) et base.css (remise à zéro, utilitaires)
  components/   composants réutilisables (+ fichiers .stories.js)
  composables/  useBooks, useFavorites, useTheme, useOpenLibrary
  router/       routes et garde de navigation
  views/        pages : Home, Catalogue, Book, Favorites, Contact, NotFound
public/
  data/books.json   catalogue de la bibliothèque (13 livres)
  covers/           couvertures
```

## Storybook : documentation des composants

[Storybook](https://storybook.js.org/) est un catalogue visuel des composants, séparé du site : il permet de voir chaque composant isolé, dans tous ses états, sans naviguer dans l'application. Il est publié en ligne avec le site : https://biblio-plus-zjol.netlify.app/storybook/ (construit par Netlify via `netlify.toml` et `npm run build:netlify`).

```sh
npm run storybook        # lance Storybook sur http://localhost:6006
npm run build-storybook  # version statique dans storybook-static/ (ignorée par git)
```

Composants documentés : `BaseButton`, `BaseCard`, `BookCard`, `BookList`, `BookListSkeleton`, `SearchBar`.

- Chaque composant a ses variantes (par exemple livre disponible, emprunté, en favori).
- Le panneau « Controls » modifie les propriétés en direct ; l'onglet « Docs » liste automatiquement les propriétés, leurs types et valeurs par défaut.
- Le sélecteur « Thème » de la barre d'outils bascule entre thème clair et sombre.
- La configuration est dans `.storybook/` ; les histoires sont les fichiers `src/components/*.stories.js`. Un routeur factice y est installé pour les liens internes.

## Accessibilité

Résultats des audits (Lighthouse mobile, axe DevTools) et corrections réalisées : voir [REVUE.md](REVUE.md).

## Déploiement

Le site est redéployé automatiquement par Netlify à chaque `git push` sur `main`. Le fichier `public/_redirects` redirige toutes les URL vers `index.html` pour que `/catalogue` ou `/livres/3` fonctionnent en accès direct.
