const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Animal = require('./animal');
const Behavior = require ('./behavior');

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
                model: 'animal',
                key: 'id'
            }
        },
        behavior_id: {
            type: DataTypes.INTEGER,
            refernces: {
                model: 'behavior',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'animal_behavior',
    }
);

module.exports = AnimalBehavior;
