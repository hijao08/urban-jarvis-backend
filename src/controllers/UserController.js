const UserService = require('../services/UserService');

class UserController {
  static async index(req, res) {
    try {
      const users = await UserService.getAllUsers();
      return res.json(users);
    } catch (error) {
      console.error('Erro no controller ao buscar usuários:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  static async create(req, res) {
    try {
      const { name, email, password } = req.body;

      // Validações básicas
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
      }

      const user = await UserService.createUser({ name, email, password });
      return res.status(201).json(user);
    } catch (error) {
      if (error.message === 'Email já está em uso') {
        return res.status(400).json({ error: error.message });
      }
      
      console.error('Erro no controller ao criar usuário:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

module.exports = UserController;
