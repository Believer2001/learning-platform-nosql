// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse:
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse :

const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');

async function createCourse(req, res) {
  // TODO: Implémenter la création d'un cours
  // Utiliser les services pour la logique réutilisable

  try {
    const courseData = req.body; // Récupérer les données envoyées dans la requête
     const result = await mongoService.createCourse(courseData); // Appeler le service pour la logique métier
    // on peut mettre un mecanisme de cache ici.
    res.status(201).json(result); // Retourner la réponse avec le statut 201 (création)
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du cours.' }); // Gestion d'erreur
  }
}

// Export des contrôleurs
module.exports = {
  // TODO: Exporter les fonctions du contrôleur

  createCourse,
  getCourse,
  getCourseStats

};

