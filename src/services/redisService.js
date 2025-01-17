// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse :
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse :

const redis = require('redis');
const client = redis.createClient();
const databaseConfiguration =require('../config/db');
const { resolve } = require('path');
const { rejects } = require('assert');

 let clientRedis;
// pour cacher les valeurs
async function cacheData(key, data, ttl) {
  try {
    // Connexion à Redis
     clientRedis = await databaseConfiguration.connectRedis();

    // Sauvegarder les données avec une expiration (TTL) en secondes
    const reply = await clientRedis.set(key, JSON.stringify(data), {
      EX: ttl, 
    });

    // Fermer la connexion Redis après l'opération
    await databaseConfiguration.CloseRedisConnection(clientRedis);

    return reply;
  } catch (err) {
    if(clientRedis)
    {
      await databaseConfiguration.CloseRedisConnection(clientRedis);
    }
    throw new Error("Error caching data: " + err.message);
  }
}



// Fonction pour faire des recherches dans le cache Redis
async function rechercheCache(key) {
  try {
    
     clientRedis = await databaseConfiguration.connectRedis();
    
    // Utilisation de la méthode `get` pour récupérer les données associées à la clé
    const reply = await clientRedis.get(key);

    await databaseConfiguration.CloseRedisConnection(clientRedis);
    return JSON.parse(reply); // Parse les données JSON et les retourne
  } catch (err) {

    if(clientRedis)
    {
      await databaseConfiguration.CloseRedisConnection();
    }
    throw new Error("Error fetching data from Redis: " + err.message);
  }
}

  

  module.exports = {
    // TODO: Exporter les fonctions utilitaires
    cacheData,
    rechercheCache,
  };