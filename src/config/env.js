// Question: Pourquoi est-il important de valider les variables d'environnement au démarrage ?
// Réponse : 

// Question: Que se passe-t-il si une variable requise est manquante ?
// Réponse : 

const path =require('path') // pour importer le fichier .env
const dotenv = require('dotenv');

const envPath = path.resolve(__dirname, '../../.env'); //chemin absolue du fichiier
dotenv.config({ path: envPath });

const requiredEnvVars = [
  'MONGODB_URI',
  'MONGODB_DB_NAME',
  'REDIS_URI'
];


// Validation des variables d'environnement
function validateEnv() {
  // TODO: Implémenter la validation

  requiredEnvVars.forEach((variable) => {
    if (!process.env[variable])
    {
      
  // Si une variable manque, lever une erreur explicative
  throw new Error(`La variable d'environnement ${variable} est requise mais est manquante.`);
}
});
}


validateEnv(); //appel de la fontion pour valider les configuration

module.exports = {
  mongodb: {
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DB_NAME
  },
  redis: {
    uri: process.env.REDIS_URI
  },
  port: process.env.PORT || 3000
};