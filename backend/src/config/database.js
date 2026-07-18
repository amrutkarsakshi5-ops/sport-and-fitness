const { Sequelize } = require('sequelize');
require('dotenv').config();

// Log environment hints to help diagnose which dialect Sequelize will use.
console.log('DB config init — NODE_ENV:', process.env.NODE_ENV || 'undefined');
console.log('DB config init — DATABASE_URL:', process.env.DATABASE_URL ? '[REDACTED]' : 'not set');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false,
});

console.log('Sequelize dialect selected:', sequelize.getDialect());

module.exports = sequelize;
