require('dotenv').config();

module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'urban_jarvis',
    host: 'localhost',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
