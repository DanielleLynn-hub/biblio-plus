# Biblio+ — Dossier de cadrage et backlog produit

Séance 1 · Support de cours Vue.js · RNCP 39608 BC01

## 1. Dossier de cadrage

### 1.1 Contexte et attentes du client

La bibliothèque municipale souhaite un site web moderne pour :

- **améliorer l'expérience des usagers** : trouver rapidement un livre et savoir s'il est disponible ;
- **rendre ses ressources et ses événements plus visibles** ;
- **garantir l'accessibilité du site**, notamment aux personnes malvoyantes (lecteurs d'écran, contrastes, navigation au clavier).

### 1.2 Contraintes

| Type | Contrainte |
| --- | --- |
| Technique | Vue 3 (API Composition, `<script setup>`), Vite, Vue Router, Pinia ; données dans `public/data/books.json` (pas de serveur) |
| Accessibilité | Respect des principes du RGAA / WCAG 2.1 niveau AA : contrastes, étiquettes de formulaire, navigation au clavier, textes alternatifs |
| Qualité | Code lint et formaté (ESLint, Prettier), tests unitaires (Vitest) |
| Déploiement | Hébergement statique Netlify, déploiement continu depuis la branche `main` de GitHub |
| Organisation | Projet en binôme, séances de 4 heures, périmètre Must validé avant 1h15 de la séance 1 |
| Données | Jeu de données fictif de 12 livres (3 catégories) ; aucune donnée personnelle collectée |

### 1.3 Livrables

1. Dossier de cadrage et backlog priorisé (ce document).
2. Maquettes Figma : 3 wireframes (accueil, catalogue, contact) et prototype cliquable v1, puis v2 après retours de 3 utilisateurs.
3. Dépôt Git avec projet Vue 3 fonctionnel, `books.json` et page d'essai avec `v-for`.
4. Site déployé en continu : https://biblio-plus-zjol.netlify.app
5. Code source : https://github.com/DanielleLynn-hub/biblio-plus

### 1.4 Planning prévisionnel

| Séance | Contenu |
| --- | --- |
| 1 | Cadrage, backlog, maquettes, initialisation du projet, déploiement continu, réactivité |
| 2 à 4 | Composants, catalogue avec recherche et filtres, routage, stores Pinia (à ajuster selon le support) |
| 5 | Tests, accessibilité (axe, Lighthouse), finitions et mise en production |

Le détail des séances 2 à 5 est à confirmer avec le support de cours.

### 1.5 Méthodologie et justification

**Méthode retenue : agile, itérations courtes (une par séance) avec backlog priorisé MoSCoW, tableau Kanban (À faire / En cours / Fait) et Git par branches de fonctionnalité.**

Justification :

- les besoins sont susceptibles d'évoluer après les retours utilisateurs sur le prototype (version 2) : une approche agile intègre ces retours sans refaire un plan complet ;
- le temps est limité : le MoSCoW permet de garantir d'abord le périmètre Must et de livrer toujours une version fonctionnelle ;
- le déploiement continu donne une version en ligne à chaque itération, ce qui facilite la validation par le client ;
- un cycle en cascade serait peu adapté à un projet court, en binôme, avec des retours à intégrer en cours de route.

## 2. Backlog priorisé (MoSCoW)

Légende : **Must** indispensable · **Should** important · **Could** souhaitable · **Won't** hors périmètre.

| # | Priorité | User story | Critères d'acceptation |
| --- | --- | --- | --- |
| US1 | Must | En tant que lecteur, je veux voir la liste des livres du catalogue afin de découvrir les ressources de la bibliothèque. | Les 12 livres de `books.json` s'affichent avec titre, auteur, catégorie et année. |
| US2 | Must | En tant que lecteur, je veux rechercher un livre par titre ou auteur afin de savoir s'il est disponible. | La liste se filtre à chaque frappe ; la recherche ignore la casse ; un message s'affiche si aucun résultat. |
| US3 | Must | En tant que lecteur, je veux voir si un livre est disponible ou emprunté afin de savoir si je peux venir le prendre. | Chaque livre affiche « Disponible » ou « Emprunté » en texte (pas seulement par la couleur). |
| US4 | Must | En tant que lecteur, je veux naviguer entre l'accueil, le catalogue et le contact afin de trouver facilement l'information. | Un menu présent sur toutes les pages ; chaque lien mène à la bonne page sans rechargement. |
| US5 | Must | En tant que lecteur malvoyant, je veux utiliser le site au clavier et avec un lecteur d'écran afin de pouvoir y accéder de façon autonome. | Tous les éléments interactifs sont atteignables par Tab avec un focus visible ; les champs ont une étiquette ; zéro erreur critique dans axe DevTools. |
| US6 | Must | En tant que lecteur, je veux que le site soit lisible avec des contrastes suffisants afin de pouvoir le lire sans fatigue. | Contraste texte/fond d'au moins 4,5:1 ; texte agrandissable à 200 % sans perte d'information. |
| US7 | Should | En tant que lecteur, je veux filtrer le catalogue par catégorie (Roman, Jeunesse, Documentaire) afin de cibler mes lectures. | Le filtre se combine avec la recherche ; une option « Toutes » est disponible. |
| US8 | Should | En tant que lecteur, je veux ouvrir la fiche détaillée d'un livre afin de lire son résumé. | L'URL de la fiche est partageable ; le résumé, la couverture et la disponibilité sont affichés ; retour au catalogue possible. |
| US9 | Should | En tant que lecteur, je veux consulter les prochains événements de la bibliothèque afin de pouvoir y participer. | Une liste d'événements avec date, titre et lieu s'affiche sur l'accueil, triée par date. |
| US10 | Should | En tant que lecteur, je veux contacter la bibliothèque via un formulaire afin de poser une question. | Les champs nom, e-mail et message sont obligatoires ; les erreurs de saisie sont annoncées clairement ; un message confirme l'envoi. |
| US11 | Could | En tant que lecteur, je veux marquer des livres en favoris afin de les retrouver plus tard. | Les favoris sont conservés après rechargement (stockage local) ; un compteur est visible. |
| US12 | Could | En tant que lecteur, je veux trier le catalogue (titre, auteur, année) afin de parcourir plus facilement. | Un contrôle de tri accessible au clavier ; l'ordre choisi est indiqué. |
| US13 | Could | En tant que lecteur, je veux choisir un thème sombre ou clair afin d'améliorer mon confort de lecture. | Le choix est mémorisé ; les deux thèmes respectent les contrastes AA. |
| US14 | Won't | En tant que lecteur, je veux réserver ou emprunter un livre en ligne. | Hors périmètre : nécessite un serveur et des comptes utilisateurs. |
| US15 | Won't | En tant que lecteur, je veux me créer un compte et me connecter. | Hors périmètre : nécessite un serveur et la gestion de données personnelles. |

**Périmètre Must à valider avant 1h15 : US1 à US6.**

## 3. Maquettes Figma à réaliser

Fichiers SVG importables dans Figma : `docs/maquettes/`. Style chaleureux « bibliothèque » : bordeaux `#7A1F2B`, crème `#FBF5EA`, or `#B8872B`, titres en Georgia (empattements), texte en Arial. Les statuts combinent couleur, icône et texte, pour ne pas reposer sur la couleur seule.

1. **Accueil** : en-tête (logo, menu Accueil / Catalogue / Contact, boutons de taille de texte), bandeau d'accroche avec recherche, chiffres clés, catégories, « Livres à la une » (4 cartes), « Prochains événements », bandeau accessibilité, pied de page.
2. **Catalogue** : bandeau de titre avec recherche, filtres latéraux (catégorie, disponibilité, tri), grille de cartes (couverture, titre, auteur, catégorie et année, statut), état « aucun résultat ».
3. **Contact** : formulaire (nom, e-mail, sujet, message) avec états d'erreur et de confirmation, coordonnées, horaires d'ouverture et plan d'accès.

**Prototype v1** : relier Accueil → Catalogue → Contact (menu et boutons).
**Version 2** : tester avec 3 utilisateurs, noter leurs retours, puis corriger la maquette.
