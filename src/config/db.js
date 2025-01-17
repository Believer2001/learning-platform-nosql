// Question : Pourquoi créer un module séparé pour les connexions aux bases de données ?
// Réponse : 
// Question : Comment gérer proprement la fermeture des connexions ?
// Réponse : 

const { MongoClient } = require('mongodb');
const redis = require('redis');
const config = require('./env');

let mongoClient, redisClient, db_Mongo;

async function connectMongo() {
  // TODO: Implémenter la connexion MongoDB

  try {
    mongoClient = await MongoClient.connect(config.mongodb.uri);
    db_Mongo = mongoClient.db(config.mongodb.dbName); // Connexion à la base de données spécifiée
    console.log('MongoDB connected');
    console.log(`database:${config.mongodb.dbName}`);
    return db_Mongo;
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
      url: config.redis.uri,
    });

    redisClient.on('connect', () => {
      console.log('Connected to Redis');
    });
    redisClient.on('error', err => console.error('Erreur Redis:', err));

   await redisClient.connect(); // Connexion à Redis
   return redisClient;
  }
  // Gérer les erreurs et les retries
  catch (err) {
    console.error('Failed to connect to Redis:', err);
    // Gestion des erreurs pour Redis
    process.exit(1); // Arrêter le processus si la connexion échoue
  }
}


// une foncion que j'ai ajouter pour fermer proprement la base de donnee


async function CloseMongoConnection( )
 {
   try {
    
    await mongoClient.close(); // Fermeture de la connexion MongoDB
    console.log('MongoDB connection closed');
  }
  
   catch (err)
   {
    console.log("Error while closing MongoDB connection",err)
   }
 }

async function CloseRedisConnection()
{
 try {
  
  await redisClient.quit(); // Fermeture de la connexion Redis
  console.log('Redis connection closed');
 } catch (error) {
  console.log("Error while closing Redis db connection",err);
  
 }
}
// Export des fonctions et clients
module.exports = {
  // TODO: Exporter les clients et fonctions utiles
  connectMongo,
  connectRedis,
  CloseMongoConnection,
  CloseRedisConnection,
  mongoClient,
  redisClient,
};