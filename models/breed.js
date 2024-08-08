const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Breed extends Model {}

Breed.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.VARCHAR
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'breed',
    }
);

module.exports = Breed;
