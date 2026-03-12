 Port de Plaisance Russell

 Présentation :

J'ai créé cette API pour la gestion des réservations de catways 
pour un port de plaisance. Elle permet de gérer les catways, 
les réservations et les utilisateurs via un dashboard sécurisé.

L'API est privée et sécurisée par JWT.

Accès à l'application : 

- Lien : https://port-russel-7pop.onrender.com
- Email : admin@port-russell.com
- Mot de passe : 1234

> Un compte admin est disponible par défaut mais il est possible 
> d'ajouter des utilisateurs via la page de gestion des utilisateurs.

Fonctionnalités : 

Catways:
Gestion complète des catways du port : ajouter, supprimer, 
modifier l'état et la disponibilité selon leur taille.

Réservations:
Gestion complète des réservations : nom du client, nom du bateau, 
dates de début et de fin, affectation à un catway.

Utilisateurs :
Gestion complète des utilisateurs qui ont accès à l'application.

Routes de l'API : 
Catways : 
| Méthode | Route | Description |
| GET | /catways | Liste tous les catways |
| GET | /catways/:id | Détails d'un catway |
| POST | /catways | Créer un catway |
| PUT | /catways/:id | Modifier un catway |
| DELETE | /catways/:id | Supprimer un catway |

Réservations : 
| Méthode | Route | Description |
| GET | /catways/:id/reservations | Liste les réservations d'un catway |
| GET | /catways/:id/reservations/:idReservation | Détails d'une réservation |
| POST | /catways/:id/reservations | Créer une réservation |
| PUT | /catways/:id/reservations/:idReservation | Modifier une réservation |
| DELETE | /catways/:id/reservations/:idReservation | Supprimer une réservation |

Utilisateurs : 
| Méthode | Route | Description |
| GET | /users | Liste tous les utilisateurs |
| GET | /users/:email | Détails d'un utilisateur |
| POST | /users | Créer un utilisateur |
| PUT | /users/:email | Modifier un utilisateur |
| DELETE | /users/:email | Supprimer un utilisateur |

Authentification:
| Méthode | Route | Description |
| POST | /users/login | Connexion |
| GET | /users/logout | Déconnexion |

Outils utilisées:

- Node.js / Express
- MongoDB / Mongoose
- JWT (authentification)
- EJS + bootsrap (HTML)
J'ai utilisé EJS comme moteur de templates car il permet 
d'intégrer du JavaScript directement dans les pages HTML,
ce qui m'a permis d'afficher les données de l'API 
dynamiquement.
- Déployé sur Render
