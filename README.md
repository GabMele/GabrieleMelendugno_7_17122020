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
npm run serve
```

En automatique l'application s'ouvrira à la page http://localhost:8080/



## Fonctionnement 

L'application consiste dans une messagerie comme un Facebook en version simplifié : ça permet aux usagers de publier de messages et de commenter les messages des autres usagers. 

Il existe 2 genres d'usager : simple et admin. Le profil admin peut valider (approuver) usagers, posts et commentaires.
Le rôle d'administrateur est défini par le champ "admin" = 1 (usager simple sera admin = 0); un admin peut promovoir un usager simple au rôle d'admin et au contraire.

Chaque usager doit être validé par un admin pour pouvoir acceder aux fonctionnalités prévues. Le champ "status" indique si l'usager est autorisé (=1) ou suspendu (=0). En tout moment chaque administrateur peut activer ou suspendre des usagers (et changer le rôle des usager entre "admin" ou "user").

L'usager simple (admin=0) n'a pas accès à la page "Usagers".

L'application est structuré sur 2 pages principales: Usages et Posts.
Dans la page Posts sont affichés tous le posts et commentaires si l'usager logged in est de type "admin", alors que pour les autres usager non admin ils seront affiché seulement les post validés ou écrits par l'usager logged. 
Tous le monde peut visualiser les posts validés et ajouter des commentaires, qui pourtant ne seront pas visualisés tant qu'un admin les ait validés.

Sur chaque post et chaque commentaire sont affiché des bouttons selon son statut (validé ou pas), selon le statut de l'usager logged in, et selon si l'usager logged in est l'auteur du post ou commentaire.

J'ai essayé de respecter la charte graphique en utilisant 3 couleurs repérées via Color Picker sur le pdf du projet.

Le site est résponsive comme demandé.

Le site est réalisé avec Vue.js. Pour le styling j’ai utilisé Bootstrap et un css où j’ai défini des styles avec le suffixe «-gm» (de GroupoMania)

Pour acceder vous pouvez utiliser l'account
email: uu@uu.uu
password: Uu123456
