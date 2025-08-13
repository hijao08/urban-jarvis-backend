const User = require('../database/models/user');

class UserService {
  static async getAllUsers() {
    try {
      return await User.findAll({
        attributes: { exclude: ['password'] }
      });
    } catch (error) {
      console.error('Erro no service ao buscar usuários:', error);
      throw error;
    }
  }

  static async createUser({ name, email, password }) {
    try {
      // Verifica se o email já está em uso
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error('Email já está em uso');
      }

      // Cria o usuário
      const user = await User.create({
        name,
        email,
        password, // Nota: Em um ambiente real, a senha deve ser criptografada antes de salvar
      });

      // Remove a senha do objeto de resposta
      const userResponse = user.toJSON();
      delete userResponse.password;

      return userResponse;
    } catch (error) {
      console.error('Erro no service ao criar usuário:', error);
      throw error;
    }
  }

  static async updateUser(id, { name, email, password }) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      user.name = name || user.name;
      user.email = email || user.email;
      user.password = password || user.password;

      await user.save();

      return user.toJSON();
    } catch (error) {
      console.error('Erro no service ao atualizar usuário:', error);
      throw error;
    }
  }

  static async deleteUser(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      await user.update({ activate: false });

      return true;
    } catch (error) {
      console.error('Erro no service ao deletar usuário:', error);
      throw error;
    }
  }
}

module.exports = UserService;
