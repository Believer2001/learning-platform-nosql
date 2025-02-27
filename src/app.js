// Question: Comment organiser le point d'entrée de l'application ?
// Question: Quelle est la meilleure façon de gérer le démarrage de l'application ?

const express = require('express');
const config = require('./config/env');
const db = require('./config/db');

const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const port =config.port;

async function startServer() {
  try {
    // TODO: Initialiser les connexions aux bases de données
    // TODO: Configurer les middlewares Express
     app.use((log));
     app.use(express.json());

    // TODO: Monter les routes
    app.use('/cours', courseRoutes);
    app.use('/student',studentRoutes);


    // TODO: Démarrer le serveur


    app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});



function log(req, res, next) {
  console.log('Path:', req.path, "QS:", req.query, 'Body:', req.body);
  next();
}
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Gestion propre de l'arrêt
process.on('SIGTERM', async () => {
  // TODO: Implémenter la fermeture propre des connexions
});

startServer();