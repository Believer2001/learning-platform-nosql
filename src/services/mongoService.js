// Question: Pourquoi créer des services séparés ?
// Réponse: 

const { ObjectId } = require('mongodb');

// Fonctions utilitaires pour MongoDB
async function findOneById(collection, id) {
  // TODO: Implémenter une fonction générique de recherche par ID

  try {
    const document = await db.collection(collection).findOne({ _id: new ObjectId(id) });
    return document;
  } catch (error) {
    throw new Error('Error finding document by ID: ' + error.message);
  }
}

// Export des services
module.exports = {
  // TODO: Exporter les fonctions utilitaires
  findOneById
};