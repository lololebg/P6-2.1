const express = require('express');
const router = express.Router();
const { Userc, logUser } = require('../Controllers/users');

// Route pour l'inscription
router.post('/signup', Userc);

// Route pour la connexion
router.post('/login', logUser);

module.exports = router;
