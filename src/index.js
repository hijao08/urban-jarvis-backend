require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./database/sequelize');

const app = express();

app.use(cors());
app.use(express.json());

// Teste de conexão com o banco de dados
sequelize.authenticate()
  .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso.'))
  .catch(err => console.error('Erro ao conectar com o banco de dados:', err));

// Rotas básicas
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
