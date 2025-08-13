const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Rota para buscar todos os usuários
router.get('/', UserController.index);

// Rota para criar um usuário
router.post('/', UserController.create);

module.exports = router;