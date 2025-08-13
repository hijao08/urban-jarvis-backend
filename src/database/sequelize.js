const { Sequelize } = require('sequelize');
const config = require('./config.js');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

let sequelize;
if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else {
  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    dbConfig
  );
}

module.exports = { sequelize };
