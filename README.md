# Projet de fin de module NoSQL

Pour ce projet, vous allez créer une petite API qui va servir de backend à une plateforme d'apprentissage en ligne. J'ai préparé la structure du projet avec une organisation professionnelle du code, comme vous pouvez le constater dans ce dépôt Github.

Commençons par l'organisation pratique :

1. Création de votre dépôt :
   - Sur Github.com
   - Créez un nouveau dépôt public
   - Nommez-le "learning-platform-nosql"
   - Ne l'initialisez pas avec un README pour le moment

2. Configuration de votre environnement local :
   ```bash
   # Clonez mon dépôt template (ce dépôt)
   git clone https://github.com/pr-daaif/learning-platform-template
   
   # Renommez le dépôt origin
   cd learning-platform-template
   git remote remove origin
   
   # Ajoutez votre dépôt comme nouvelle origine
   git remote add origin https://github.com/[votre-compte]/learning-platform-nosql
   
   # Poussez le code vers votre dépôt
   git push -u origin main
   ```

3. Installation des dépendances :
   ```bash
   npm install
   ```

Je vous propose une structure de code qui suit les bonnes pratiques de développement. Vous trouverez dans le code des commentaires avec des **questions qui vous guideront dans votre réflexion**. Ces questions sont importantes car elles vous aideront à comprendre les choix d'architecture.

### Aspects professionnels à noter :
- Utilisation des variables d'environnement pour la configuration
- Séparation claire des responsabilités (routes, contrôleurs, services)
- Gestion propre des connexions aux bases de données
- Organisation modulaire du code
- Gestion des erreurs et des cas limites
- Documentation du code

### Pour le rendu, voici ce que j'attends :
1. Un dépôt public sur Github avec un historique de commits clair
2. Un README.md qui explique :
   - Comment installer et lancer le projet
   - La structure du projet
   - Les choix techniques que vous avez faits
   - Les réponses aux questions posées dans les commentaires
3. Le code complété avec tous les TODOs implémentés

### Je vous conseille de procéder étape par étape :
1. Commencez par lire et comprendre la structure du projet
2. Répondez aux questions des commentaires dans le README
3. Implémentez progressivement les TODOs
4. Testez chaque fonctionnalité au fur et à mesure
5. Documentez vos choix et vos réflexions en ajoutant des copies d'écrans à votre fichier README.md

#### Bon courage

# Reponses aux question des commentaires


### Question: 
#### Quelles sont les informations sensibles à ne jamais commiter ?
### Réponse : 
les informations  sensibles   jamais  commitees sont :
1. Clés API : les clés d'accès aux services tiers comme Google Cloud, AWS, ou tout autre service nécessitant une authentification.
2. Identifiants et mots de passe : Les mots de passe des bases de données, des API, ou des comptes utilisateurs.
3. Certificats et clés privées : Les clés privées utilisées pour des connexions sécurisées ou des services de cryptage.

4. Paramètres de configuration spécifiques à l'environnement : Ceux qui sont destinés à être secrets et qui peuvent fournir une porte d'accès à des systèmes ou services.


### Question:
#### Pourquoi utiliser des variables d'environnement ?
### Réponse : 

les variable d'environnement permette de securiser les informations sensibles en les separant des isolant des code  qu'on va partager dans un depot publlic. 
Il permet entre autre de faciliter la gestion des configuration. Il rend l'application beaucoup plus  flexible  a s'adapter a different environnement car certaines informations peuvent varier d'un environnement a un autre.

Pour eviter que les variables d'environnement soient exporter on l'ajoute le fichier .env au fichier .gitignore avant de faire des commit.


## configuration variable des variables environnement

### Question:
#### Pourquoi est-il important de valider les variables d'environnement au démarrage ?
### Réponse : 

Il est important de valider les variables d'environnement au démarrage pour e vérifier que toutes les variables d'environnement requises sont présentes et de lever une erreur explicite si une ou plusieurs sont manquantes. Cela assure la sécurité et fiabilité, facilite de débogage
et permet la prévention des erreurs de configuration 

### Question: 
#### Que se passe-t-il si une variable requise est manquante ?
### Réponse : 
Si une variable requise est manquante, l'application lèvera une erreur explicite avec un message indiquant quel nom de variable est absent. Cela arrêtera l'exécution de l'application et évitera que l'application fonctionne dans un état incorrect, ce qui pourrait entraîner des erreurs difficiles à diagnostiquer plus tard.



### Question :
#### Pourquoi créer un module séparé pour les connexions aux bases de données ?
### Réponse : 

Créer un module séparé pour les connexions aux bases de données présente plusieurs avantages notament :
 
 - Séparation des préoccupations, En isolant la logique de connexion aux bases de données dans un module dédié, vous respectez le principe de séparation des préoccupations. Cela rend votre code plus lisible et maintenable. 

 - Réutilisabilité , Comme notre application doit se connecter à duex bases de données   MongoDB et  Redis un module de connexion générique permet de réutiliser le même code de connexion partout dans l'application, sans dupliquer la logique de connexion dans chaque fichier.

-  Centralisation de la configuration , Le module de connexion centralise la configuration des bases de données (URL, port, nom de la base de données), ce qui rend les changements dans la configuration plus faciles à gérer. nous n'aurez à modifier ces paramètres qu'à un seul endroit.

- Gestion des erreurs et des exceptions, Avoir un module dédié pour la connexion aux bases de données, nous  pouvons  gérer proprement les erreurs liées à la connexion.



### Question : 
#### Comment gérer proprement la fermeture des connexions ?
### Réponse : 

Pour  gérer proprement la feermerture des connexions on peut l'effectuer cela a trois niveau.
une fermture normales apres  requete , et une fermeture  lors de la  fermerture de l'application en cours d'execution avec  des connexions actives. Ainsi on doit veuilez a la fermeture a : 
- Fermeture des connexions à MongoDB , On effectue cela apres chaque connexion et avoir fini les operation.

Fermeture des connexions à Redis, on effectue cette fermeture apres chaque connection comme pour Mongodb

Gestion lors de l'arrêt de l'application, Il est crucial de fermer les connexions lorsque l'application s'arrête. on  écouter les signaux de l'OS comme SIGINT pour les interruption et fermer proprement les connexions en réponse à ces événements.


##  controller


### Question: 
### Quelle est la différence entre un contrôleur et une route ?
### Réponse:

Une route est une définition d'un chemin d'URL associé à une méthode HTTP (GET, POST, PUT, DELETE, etc.). Elle indique à l'application quelle action déclencher lorsqu'une requête correspondante est reçue. Les routes servent principalement à diriger les requêtes vers les contrôleurs appropriés. Alors qu' un contrôleur est une fonction ou un groupe de fonctions responsables de traiter les requêtes HTTP entrantes. Il contient la logique nécessaire pour gérer la requête, comme la validation des données, l'appel des services ou la préparation de la réponse. Les contrôleurs sont appelés par les routes. 


### Question : 
#### Pourquoi séparer la logique métier des routes ?
### Reponse :
Séparer la logique métier des routes est une bonne pratique de développement qui offre plusieurs avantages :

   - Lisibilité et clarté, Les routes restent simples et faciles à lire puisqu'elles se limitent à associer des chemins d'URL et des contrôleurs.
   La logique complexe est déplacée dans les contrôleurs ou les services.

   - Réutilisabilité, La logique métier dans les contrôleurs ou les services peut être réutilisée dans d'autres parties de l'application.

   - Testabilité ,il est plus facile de tester les contrôleurs et les services de manière isolée, sans avoir besoin de simuler des requêtes HTTP.

   - Modularité, Une application modulaire est plus facile à maintenir. En isolant la logique métier dans des contrôleurs et services, vous pouvez modifier ou étendre le comportement de votre application sans affecter les routes.

   - Respect du principe de séparation des préoccupations, les routes s'occupent du routage et les contrôleurs s'occupent de la logique métier spécifique à une requête.


## routes

### Question:
#### Pourquoi séparer les routes dans différents fichiers ?
### Réponse : 
La séparer les routes dans différents fichiers présente plusieurs avantages:

   - En terme de lisibilité, En séparant les routes par fonctionnalité ou ressource, le code devient plus facile à lire et à maintenir. 

   - Organiser les routes par catégorie  permet de garder une structure modulaire. Chaque fichier de route contient uniquement les routes relatives à une fonctionnalité ou un domaine spécifique.

    Collaboration, lorsque plusieurs développeurs travaillent sur le projet, séparer les routes par fichier permet à chacun de travailler sur différentes parties de l'application sans trop de conflits.



###  Question : 
#### Comment organiser les routes de manière cohérente ?
### Réponse: 
Pour organiser les routes de manière cohérente, voici quelques bonnes pratiques :

   - Au niveau de la structure de Dossiers : la  création d'un dossier routes à la racine de votre projet, et à l’intérieur, des sous-dossiers ou fichiers pour chaque ressource ou fonctionnalité. 
   
   - au niveau de l'organisation par Ressource ou Fonctionnalité, chaque fichier de route doit être lié à une fonctionnalité spécifique ou une ressource. 


## Service 

### Question:
#### Pourquoi créer des services séparés ?
### Réponse: 

La création de services séparés permet de mieux organiser et structurer votre code. elle favorise :

   - La réutilisabilité  En regroupant des fonctionnalités génériques dans des services, on peut  les réutiliser dans différentes parties de l'application. Par exemple, une fonction de recherche dans la base de données peut être utilisée dans plusieurs contrôleurs ou modules sans duplication de code.

   - La séparation des responsabilités, en effet  la logique métier et les interactions avec la base de données (ou d'autres services externes) sont séparées de la gestion des requêtes HTTP (les routes). Cela permet de mieux organiser le code et de le rendre plus lisible et maintenable.

   - Testabilité : En isolant la logique dans des services, vous pouvez facilement tester chaque fonction indépendamment, ce qui facilite les tests unitaires. 



### Question :
#### Comment gérer efficacement le cache avec Redis ?
### Réponse :
Stocker les données fréquemment demandées : Utilisez Redis pour stocker les données qui sont fréquemment demandées ou qui changent peu fréquemment (ex : résultats de requêtes complexes, sessions utilisateur).
Définir une durée de vie (TTL) : Utilisez la fonctionnalité TTL (Time-To-Live) de Redis pour définir une expiration automatique des données stockées dans le cache. Cela permet de ne pas surcharger la mémoire avec des données obsolètes. Par exemple, pour des informations qui sont valables seulement pendant un court moment, vous pouvez spécifier un TTL approprié.
Mettre en cache les résultats de requêtes complexes ou des calculs coûteux : Si certaines opérations prennent beaucoup de temps ou consomment beaucoup de ressources (comme des calculs sur de grandes quantités de données), stockez les résultats dans Redis pour éviter de refaire ces opérations inutilement.
Utiliser des stratégies de remplacement : Redis offre plusieurs stratégies pour remplacer des éléments dans le cache lorsque la mémoire est pleine, telles que LRU (Least Recently Used). Utilisez celle qui convient le mieux à vos besoins.
Prendre en compte la cohérence des données : Assurez-vous que le cache et la base de données sont cohérents. Par exemple, lorsqu'un document est mis à jour dans la base de données, vous pouvez aussi mettre à jour le cache dans Redis pour éviter des incohérences.
### Question: 
#### Quelles sont les bonnes pratiques pour les clés Redis ?
### Réponse :
    Utilisez des clés significatives et lisibles : Choisissez des noms de clés qui sont faciles à comprendre et à identifier. Par exemple, pour un utilisateur, vous pouvez utiliser user:123 ou session:456.

    Préfixez vos clés : Utilisez des préfixes pour éviter les conflits de noms. Par exemple, pour les données utilisateur, vous pouvez utiliser user:<user_id>. Cela vous permet de mieux organiser les données et de faciliter leur gestion.

    Utilisez une structure de clé hiérarchique : Au lieu de stocker des clés plates comme user123, vous pouvez utiliser des structures hiérarchiques comme user:123:name ou user:123:profile, ce qui rend les clés plus compréhensibles.

    Utiliser des clés de type expiration (TTL) : Lorsque vous stockez des informations temporaires ou des sessions utilisateurs, assurez-vous que les données ont une durée de vie limitée via TTL. Cela évite de surcharger le cache avec des informations inutiles.

    Ne pas stocker des informations sensibles sans sécurité : Si vous stockez des informations sensibles dans Redis, assurez-vous que Redis est configuré avec un mot de passe sécurisé, qu'il fonctionne sur un réseau privé et que les données sont cryptées si nécessaire.

Exemple de clé Redis :

Pour stocker des informations relatives à un utilisateur, vous pourriez utiliser les clés suivantes :

    user:123:profile pour les informations générales du profil utilisateur.
    user:123:sessions pour les informations de session de l'utilisateur.
    product:456 pour un produit spécifique.

Ces clés sont claires, bien structurées et permettent de bien séparer les données, facilitant leur gestion et leur expiration.


## Comment lancer installer le projet ?

#### Preparation de l'enviroonnement
Pour installer  le projet et l'executer , il faut  telecharger le   faut cloner le present depot ou le telechaarger manuellement. Une fois le document telecharge, assurer  assurez vous d'avoir l'environnment NodeJs et  le gestionnaiire de package npm installer sur la machine.

-> installer la base de donnee Redis sur la machine 
-> installer MongoDB, ou disposer d'uns connection string depuis Mongo atlas. Dans ce derniers cas, vous devez changer l'url de  mongo dans les varaible d'environnenmt par le connection string de Mongo atlas dans le fichier .env.

-> assurer vous que la base de donnee Redis installer en local a  ecoutes au port indique dans le fichier .env sinon changer le par port adequat.

-> on  executer dans le terminale, dans le repertoire presipal la commande.
  npm install
  ex: leaning-platform-Temple> npm install

  cela permet d'installer tout les dependance  contenus dans le fichier package.jason, et permet d'intilaiser un fichier node_modules.

#### demarrage du server.
 Dans le terminal , dans le repertoire src, tapez la commande 
 nodemon app

ex: leaning-platform-Temple/src> nodemon app

cela lance autoamtique nontre serveur qui ecoute sur le port 3000. 
 on peut alors effectuer des requetes http depuis le termminal   pour  obtenir les reponse.
 ->  on peut aussi prevoir une interface en html qui va permettre d'interagir avec le serveur.
 Pour ce faire on a qu' a cree un dossier public contenant les fichiers .html et/css qui vont eservir d'interface . Apres on ajoute au fichier app.js le middleware : app.use(express.static('./public')) dans la configuration des middleware.


