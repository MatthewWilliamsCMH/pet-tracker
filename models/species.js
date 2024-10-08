const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Species extends Model {}

Species.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        species: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'species'
    }
);

module.exports = Species;
