# Projet 7 - Groupomania Messagerie d'entreprise
## "Postmania"

## de Gabriele Melendugno


INSTRUCTIONS

- Installer Node.js

- installer le database


- Cloner ce repository en local;

- dans le dossier Backend  lancer 
```bash
node server
```

- dans le dossier Frontend lancer 
```bash
node run serve
```

En automatique l'application s'ouvrira à la page http://localhost:8080/



## Fonctionnement 

L'application permet de gérer des usagers, leurs posts et leurs commentaires aux posts.

Il existe 2 genre d'usager : simple et admin. Le profil admin peut valider (approuver) les usagers, posts et commentaires.
Le rôle d'administrateur est défini par le champ "admin" = 1 (usager simple sera admin = 0).

Le champ "status" indique si l'usager est autorisé (=1) ou suspendu (=0). En tout moment chaque administrateur peut activer ou suspendre des usagers, et en plus peut aussi rendre "admin" ou retirer ce statut aux autres usagers.

L'usager simple (admin=0) n'a pas accès à la page "Usagers".

Le site permet de partager des messages avec des images et de les commenter, les vôtres et celles des autres. Les images sont ajouté via url.

L'application est structuré sur 2 pages principales: Usages et Posts.
Dans la page Posts sont affichés tous le posts et commentaires pour les admins, seulement les post validés ou écrits par l'usager logged. Tous le monde peut visualiser les posts validés et ajouter des commentaires, qui pourtant ne seront pas visualisés tant qu'un admin les ait validés.
Chaque post et chaque commentaire affichera des bouttons selon son statut (validé ou pas), selon le statut de l'usager logged in, et selon si l'usager logged in est l'auteur du post ou commentaire.

J'essayé de respecter la charte graphique en utilisant 3 couleurs repérées via Color Picker sur le pdf du projet.

Le site est résponsive comme demandé.

Le site est réalisé avec Vue.js. Pour le styling j’ai utilisé Bootstrap et un css où j’ai défini des styles avec le suffixe «-gm» (de GroupoMania)

Pour acceder vous pouvez utiliser l'account
email: uu@uu.uu
password: Uu123456
