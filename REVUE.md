# Revue de code et audit d'accessibilité

## Auto-revue (à compléter avec la revue croisée d'un autre binôme)

1. **Props typées** : tous les composants déclarent leurs props avec type et valeur par défaut (`BookList.favorites`, `BaseButton.variant/to`, etc.).
2. **Pas de valeur en dur** : couleurs, espacements et polices passent par `src/assets/tokens.css`.
3. **Sémantique** : `header`, `nav`, `main`, `footer`, `article`, un seul `h1` par vue, lien d'évitement « Aller au contenu ».

## Corrections d'accessibilité réalisées

- Libellés `label for` sur tous les champs (recherche, catégorie, tri, contact).
- Erreurs de formulaire reliées par `aria-describedby` + `aria-invalid`, états `role="status"` / `role="alert"`.
- Statut de disponibilité en texte + icône (pas seulement la couleur).
- Focus visible global (`:focus-visible`), texte d'or écarté pour contraste insuffisant.

## Audit (accueil, mobile)

| Outil | Résultat |
| --- | --- |
| Lighthouse Performance | 62 → 89 (couvertures converties en WebP 480 px) |
| Lighthouse Accessibilité | 92 → 100 |
| Lighthouse Bonnes pratiques | 100 |
| Lighthouse SEO | 83 → 92 (titre, `lang="fr"`, meta description) |

axe DevTools (WCAG 2.1 AA, bonnes pratiques activées) : 0 problème détecté automatiquement ; tests guidés Clavier, Structure, Images, Tableaux, Éléments interactifs et Dialogues : 0 problème ; Formulaires : 2 problèmes « guidés » sur le champ de recherche de l'accueil.

1. *Visible label missing* (grave) : le libellé n'était visible que pour les lecteurs d'écran. **Corrigé** : libellé « Rechercher un livre » désormais visible au-dessus du champ.
2. *Required field missing aria-required* (modéré, bonne pratique) : question guidée, le champ n'est pas obligatoire. **Ignoré** (faux positif).

Autre correction : menu de l'en-tête coupé sur mobile, maintenant à la ligne.

## À faire

- Revue croisée : noter ici 3 remarques d'un autre binôme.
- Scanner axe sur `/catalogue` et `/contact`.
