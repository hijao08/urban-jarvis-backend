const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

// Rota para buscar todos os usuários
router.get('/', UserController.index);

// Rota para criar um usuário
router.post('/', UserController.create);

// Rota para atualizar um usuário
router.put('/:id', UserController.update);

// Rota para deletar um usuário
router.delete('/:id', UserController.delete);

module.exports = router;