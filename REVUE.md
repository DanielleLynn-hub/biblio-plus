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

## À faire

- Relever les scores Lighthouse (4 catégories, mobile) et le détail des violations axe DevTools dans le navigateur.
- Fournir les images de `public/covers/` (actuellement absentes : fond uni + texte alternatif).
