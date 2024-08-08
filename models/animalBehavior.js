const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Animal = require('./animal');
const Behavior = requrie ('./behavior');

class AnimalBehavior extends Model {}

AnimalBehavior.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        animal_id: {
            type: DataTypes.INTEGER,
            refernces: {
                model: Animal,
                key: 'id'
            }
        },
        behavior_id: {
            type: DataTypes.INTEGER,
            refernces: {
                model: Behavior,
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'color',
    }
);

module.exports = AnimalBehavior;
