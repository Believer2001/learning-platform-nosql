// Question: Pourquoi créer des services séparés ?
// Réponse: 

const {ObjectId} = require('mongodb');
const databaseConfiguration = require('../config/db');
const { config } = require('dotenv');


// Fonctions utilitaires pour  
async function findOneById(collection, id) {

  // TODO: Implémenter une fonction générique de recherche par ID
  try {
    
    const db = await  databaseConfiguration.connectMongo();
    const colet = db.collection(collection);
    
    const document = await colet.findOne({"id_cours":parseInt(id,10) });
   console.log(collection,parseInt(id,10));

   await databaseConfiguration.CloseMongoConnection();
    return document;
  } catch (error) {
    if (databaseConfiguration.mongoClient) {
      await databaseConfiguration.CloseMongoConnection();
      console.log("MongoDB bien fermee, mais il y un probleme de l'operation de recherche");
    }
    throw new Error('Error finding document by ID: ' + error.message);
  }
  
}




// fonction pour chercher par id du cours 



async function findOneByIdstudent(collection, id) {

  // TODO: Implémenter une fonction générique de recherche par ID
  try {
    
    const db = await  databaseConfiguration.connectMongo();
    const colet = db.collection(collection);
    
    const document = await colet.findOne({"id_student":parseInt(id,10) });
   console.log(collection,parseInt(id,10));

   await databaseConfiguration.CloseMongoConnection();
    return document;
  } catch (error) {
    if (databaseConfiguration.mongoClient) {
      await databaseConfiguration.CloseMongoConnection();
      console.log("MongoDB bien fermee, mais il y un probleme de l'operation de recherche");
    }
    throw new Error('Error finding document by ID: ' + error.message);
  }
  
}





// Fonction d'insertion dans la base de données
async function insertionOne(collection, document) {
  try {

    const dbase = await  databaseConfiguration.connectMongo();
    const colet= dbase.collection(collection);
    const result = await colet.insertOne(document);
    console.log("le document a ete bien insere:",result.insertedId);
    await databaseConfiguration.CloseMongoConnection(databaseConfiguration.mongoClient);

    return result; // retourne le résultat de l'insertion
  } catch (error) {
    if (mongoClient) {
      await databaseConfiguration.CloseMongoConnection(mongoClient);
      console.log("MongoDB bien fermee , mais il y a un probleme d'insertion");
    }
    throw new Error("Error insertion document: " + error.message);
  }
}


// fonction pour  avoir les statistiques 

// Pour cela nous faire une agreation pour  les  avoir 
// les donnnees
async function getStatistics(collection) {
  let mongoClient; // Pour fermer la connexion en cas d'erreur
  try {
    const dbase = await databaseConfiguration.connectMongo();
    mongoClient = databaseConfiguration.mongoClient;
    const colet = dbase.collection(collection);
    
    console.log("Dans getStatistics");

    const pipeline = [
      {
        $group: {
          _id: "$filiere", // Grouper par filière
          totalCours: { $sum: 1 }, // Nombre total de cours
          totalVolumeHoraire: { $sum: "$volume_horraire" }, // Volume horaire total
          distinctProfs: { $addToSet: "$prof" }, // Profs uniques
        },
      },
      {
        $project: {
          filiere: "$_id", // Renommer _id en filière
          totalCours: 1,
          totalVolumeHoraire: 1,
          professeursDistincts: { $size: "$distinctProfs" }, // Compter les profs uniques
          _id: 0, // Ne pas afficher _id
        },
      },
    ];

    // Exécution de l'agrégation
    const result = colet.aggregate(pipeline);

    // Attente des résultats
    const stats = await result.toArray();

    // Fermeture de la connexion MongoDB
    await databaseConfiguration.CloseMongoConnection(mongoClient);

    return stats;
  } catch (error) {
    // Fermeture de la connexion en cas d'erreur
    if (mongoClient) {
      await databaseConfiguration.CloseMongoConnection(mongoClient);
      console.log("MongoDb bien fermeee, mais il y a un probleme liee aux statistiques");
    }
    throw new Error("Error getting statistics: " + error.message);
  }
}



// Export des services
module.exports = {
  // TODO: Exporter les fonctions utilitaires
  findOneById,
  getStatistics,
  insertionOne,
  findOneByIdstudent,
};