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

### Reponses aux question des commentaires

# Question: Quelles sont les informations sensibles à ne jamais commiter ?
# Réponse : 
les informations  sensibles   jamais  commieter sont :
1. Clés API : les clés d'accès aux services tiers comme Google Cloud, AWS, ou tout autre service nécessitant une authentification.
2. Identifiants et mots de passe : Les mots de passe des bases de données, des API, ou des comptes utilisateurs.
3. Certificats et clés privées : Les clés privées utilisées pour des connexions sécurisées ou des services de cryptage.

4. Paramètres de configuration spécifiques à l'environnement : Ceux qui sont destinés à être secrets et qui peuvent fournir une porte d'accès à des systèmes ou services.


# Question: Pourquoi utiliser des variables d'environnement ?
# Réponse : 
les variable d'environnement permette de securiser les informations sensibles en les separant des isolant des code  qu'on va partager dans un depot publlic. 
Il permet entre autre de faciliter la gestion des configuration. Il rend l'application beaucoup plus  flexible  a s'adapter a different environnement car certaines informations peuvent varier d'un environnement a un autre.

Pour eviter que les variables d'environnement soient exporter on l'ajoute le fichier .env au fichier .gitignore avant de faire des commit.


### configuration variable des variables environnement

# Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
# Réponse : 

Il est important de valider les variables d'environnement au démarrage pour e vérifier que toutes les variables d'environnement requises sont présentes et de lever une erreur explicite si une ou plusieurs sont manquantes. Cela assure la sécurité et fiabilité, facilite de débogage
et permet la prévention des erreurs de configuration 

# Question: Que se passe-t-il si une variable requise est manquante ?
# Réponse : 
Si une variable requise est manquante, l'application lèvera une erreur explicite avec un message indiquant quel nom de variable est absent. Cela arrêtera l'exécution de l'application et évitera que l'application fonctionne dans un état incorrect, ce qui pourrait entraîner des erreurs difficiles à diagnostiquer plus tard.



# Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
# Réponse : 

Créer un module séparé pour les connexions aux bases de données présente plusieurs avantages notament :
 
 - Séparation des préoccupations, En isolant la logique de connexion aux bases de données dans un module dédié, vous respectez le principe de séparation des préoccupations. Cela rend votre code plus lisible et maintenable. 

 - Réutilisabilité , Comme notre application doit se connecter à duex bases de données   MongoDB et  Redis un module de connexion générique permet de réutiliser le même code de connexion partout dans l'application, sans dupliquer la logique de connexion dans chaque fichier.

-  Centralisation de la configuration , Le module de connexion centralise la configuration des bases de données (URL, port, nom de la base de données), ce qui rend les changements dans la configuration plus faciles à gérer. nous n'aurez à modifier ces paramètres qu'à un seul endroit.

- Gestion des erreurs et des exceptions, Avoir un module dédié pour la connexion aux bases de données, nous  pouvons  gérer proprement les erreurs liées à la connexion.



# Question : Comment gérer proprement la fermeture des connexions ?
# Réponse : 

Pour  gérer proprement la feermerture des connexions on peut l'effectuer cela a trois niveau.
une fermture normales apres  requete , et une fermeture  lors de la  fermerture de l'application en cours d'execution avec  des connexions actives. Ainsi on doit veuilez a la fermeture a : 
- Fermeture des connexions à MongoDB , On effectue cela apres chaque connexion et avoir fini les operation.

Fermeture des connexions à Redis, on effectue cette fermeture apres chaque connection comme pour Mongodb

Gestion lors de l'arrêt de l'application, Il est crucial de fermer les connexions lorsque l'application s'arrête. on  écouter les signaux de l'OS comme SIGINT pour les interruption et fermer proprement les connexions en réponse à ces événements.




