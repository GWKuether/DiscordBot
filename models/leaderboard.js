const Sequelize = require('sequelize')
const sequelize = require('../utils/database')

const Leaderboard = sequelize.define('leaderboard', {
    name: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    wins: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
    }

});

module.exports = Leaderboard;