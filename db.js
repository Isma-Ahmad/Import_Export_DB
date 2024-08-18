
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('data_transfer', 'postgres', '1234', {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;
