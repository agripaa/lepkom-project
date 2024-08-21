const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Prediction = sequelize.define('Prediction', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
    },
    predictedAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    predictionDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
}, {
    tableName: 'predictions',
    timestamps: true,
});

module.exports = Prediction;
