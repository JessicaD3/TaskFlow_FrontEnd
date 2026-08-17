# TaskFlow

Application de gestion de tâches developppée en React (VITE), qui utilise l'API JSONPlaceholder comme backend de test pour les tâches.
Projet réalisé dans le cadre de la première année d'un MASTERE INFO. 

## Fonctionnalités de l'application
- Ajout, modification et suppression d'une tâche
- Changer l'état d'une tâche comme terminée ou à faire
- Filtres par statut (Toutes / A faire / Terminées ) avec des compteurs qui servent de statistiques
- Recherche par le nom de la tâche 
- Thème clair / sombre avec persistance dans le LocalStorage
- Notifications (toats) de succès / erreurs sur les actions CRUD

### Stack Technique 
- React + VITE
- Module CSS pour les composants, le CSS global
- JSONPlaceholder (`https://jsonplaceholder.typicode.com/todos`) comme API pour simulé le BackEnd

### Installation et lancement du projet
npm install
npm run dev

L'application est accessible sur `http://localhost:5173`. Ou sur `https://task-flow-front-end-gamma.vercel.app/`


## Piste d'améliorations
- Ajouter des tests unitaires (React Testing Library) sur les hooks et composants 
- Améliorer l'interface visuelle 
- Etendre la recherche / filtrage à toutes les tâches, et non à la page courante comme pour les statistiques
- Persister les tâches créées en session dans le LocalStorage, pour qu'elles survivent au rechargement. 

===================================
===================================

## Hooks Personnalisés
`useLocalStorage`: Synchronise une valeur avec le localStorage du navigateur
`useDebounce`: Retarde la mise à jour d'une valeur (utilisé pour la recherche)
`useFetch`: Charge des données depuis une URL, avec cleanup via `AbortController`, gestion du chargement et des erreurs et montre le compte total de tâches pour la pagination
`useTaskOperations`: Centralise les opérations CRUD et déclenche les notifications

## Contexte 
`ThemeContext`: thème clair et sombre, qui persiste via le localStorage
`NotificationContext`: notifications temporaires qui dure 4 seconde et est déclenchée par toute action CRUD


















