// Question: Quelle est la différence entre un contrôleur et une route ?
// Réponse:
// Question : Pourquoi séparer la logique métier des routes ?
// Réponse :

const { ObjectId } = require('mongodb');
const db = require('../config/db');
const mongoService = require('../services/mongoService');
const redisService = require('../services/redisService');
const express =require('express');


async function createStudent(req, res) 
{
  // TODO: Implémenter la création d'un cours
  // Utiliser les services pour la logique réutilisable

  try {
    const studentData = req.query; // Récupérer les données envoyées dans la requête
     const result = await mongoService.insertionOne(studentData); // Appeler le service pour la logique métier
    // on peut mettre un mecanisme de cache ici.
    res.status(201).json(result); // Retourner la réponse avec le statut 201 (création)
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création du cours.' }); // Gestion d'erreur
  }
}



//fonction pour getCours
async function getStudent(req, res) {
  try {
    const id = req.params.id;
    const collection =req.query.collection;

    //  pour avoir l'url complete pour  enregistrer et  rechereche  
    const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`; 

    // Recherche dans le cache
    const resultCache = await redisService.rechercheCache(fullUrl);

    if (resultCache) {
      // Si trouvé dans le cache, renvoyer directement
      if (typeof resultCache === 'string') {
        return res.json(JSON.parse(resultCache));
      } else {
        return res.json(resultCache);
      }

    }

    // Sinon, chercher dans MongoDB
    const resultMongo = await mongoService.findOneByIdstudent(collection,id);
    
    
    

    if (!resultMongo) {
      // Si le document n'est pas trouvé dans MongoDB
      return res.status(404).json({ error: "student  non trouvé" });
    }

    // Stocker le résultat dans le cache pour les futures requêtes
    await redisService.cacheData(fullUrl, resultMongo, 200); // TTL de 1 heure

    // Renvoyer la réponse depuis MongoDB
    
    return res.json(resultMongo);
  } catch (error) {
    console.error("Erreur lors de la récupération du student:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}





//focntion getCouresStats

async function getStudentsStats(req,res) {

  try {
  const collection = req.query.collection;

  const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`; 

  const resultCache = await redisService.rechercheCache(fullUrl);

  
  if (resultCache) {
    // Si trouvé dans le cache, renvoyer directement
    if (typeof resultCache === 'string') {
      return res.json(JSON.parse(resultCache));
    } else {
      return res.json(resultCache);
    }
  }

    // Sinon, chercher dans MongoDB
    const resultMongo = await mongoService.getStatistics(collection)
    

    if (!resultMongo) {
      // Si le document n'est pas trouvé dans MongoDB
      return res.status(404).json({ error: "Statistiques de ${collecion}" });
    }

    // Stocker le résultat dans le cache pour les futures requêtes
    await redisService.cacheData(fullUrl, resultMongo, 200); // TTL de 1 heure

    // Renvoyer la réponse depuis MongoDB
    
    return res.json(resultMongo);
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
    return res.status(500).json({ error: "Erreur serveur" });
  }
}





// Export des contrôleurs
module.exports = {
  // TODO: Exporter les fonctions du contrôleur

  createStudent,
  getStudent,
  getStudentsStats

};

