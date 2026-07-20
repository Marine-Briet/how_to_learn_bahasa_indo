# Kartu Bahasa 🇮🇩

Application de flashcards personnelle pour réviser 100 verbes indonésiens (racine + formes dérivées + traduction), classés par thématique.

## Fonctionnalités

- 100 verbes répartis en 9 thématiques (Communication, Déplacement, Émotions & Relations...)
- Sélection d'une ou plusieurs thématiques avant de réviser
- Sens des cartes au choix : français → indonésien, indonésien → français, ou mélangé
- Vue "Tous les mots" avec recherche et filtres, pour consulter la liste complète
- 100% statique, aucune clé API ni service externe requis

## Stack

Vite + React, déployé sur Vercel.


## Enrichir la base de verbes

Tout se trouve dans `src/data/verbes.js` — un objet par verbe (`racine`, `formes`, `traduction`, `categorie`), aucun autre fichier à toucher pour en ajouter.


https://howtolearnbahasa.vercel.app
