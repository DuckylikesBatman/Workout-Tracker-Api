const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const Feedback = sequelize.define('Feedback', {
  message: DataTypes.STRING,
  rating: DataTypes.INTEGER
});

sequelize.sync();

module.exports = Feedback;