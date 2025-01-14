// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse :
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse :

const redis = require('redis');
const client = redis.createClient();

// Fonctions utilitaires pour Redis
async function cacheData(key, data, ttl) {
    // TODO: Implémenter une fonction générique de cache

    return new Promise((resolve, reject) => {
      // Sauvegarder les données avec une expiration (TTL)
      client.setex(key, ttl, JSON.stringify(data), (err, reply) => {
          if (err) reject(err);
          else resolve(reply);
      });
  });
  }
  
  module.exports = {
    // TODO: Exporter les fonctions utilitaires
    cacheData
  };