// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse : 
// Question : Comment organiser les routes de manière cohérente ?
// Réponse: 

const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentsController');

// Routes pour les cours
router.get('/:id', studentController.getStudent);
router.post('/', studentController.createStudent);
router.get('/stats', studentController.getStudentsStats);

module.exports = router;