// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : 
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : 

const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db;

async function connectMongo() {
  // TODO: Implémenter la connexion MongoDB

  try {
    mongoClient = await MongoClient.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoClient.db(config.MONGODB_DB_NAME); // Connexion à la base de données spécifiée
    console.log('MongoDB connected');
  }
  // Gérer les erreurs et les retries

 catch (err) {
  console.error('Failed to connect to MongoDB:', err);
  
  process.exit(1); // Arrêter le processus si la connexion échoue
}

}




async function connectRedis() {
  // TODO: Implémenter la connexion Redis
  try {
    redisClient = redis.createClient({
      url: config.REDIS_URI,
    });

    redisClient.on('connect', () => {
      console.log('Connected to Redis');
    });

    await redisClient.connect(); // Connexion à Redis
  }
  // Gérer les erreurs et les retries
  catch (err) {
    console.error('Failed to connect to Redis:', err);
    // Gestion des erreurs pour Redis
    process.exit(1); // Arrêter le processus si la connexion échoue
  }
}


// une foncion que j'ai ajouter pour fermer proprement la base de donnee

// Fonction pour fermer proprement les connexions
async function closeConnections() {
  try {
    if (mongoClient) {
      await mongoClient.close(); // Fermeture de la connexion MongoDB
      console.log('MongoDB connection closed');
    }

    if (redisClient) {
      await redisClient.quit(); // Fermeture de la connexion Redis
      console.log('Redis connection closed');
    }
  } catch (err) {
    console.error('Error while closing connections:', err);
  }
}




// Export des fonctions et clients
module.exports = {
  // TODO: Exporter les clients et fonctions utiles
  connectMongo,
  connectRedis,
  closeConnections,
  db, // Export de la base MongoDB si nécessaire ailleurs dans l'application
  redisClient, // Export du client Redis si nécessaire ailleurs

};