const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Kennel extends Model {}

// assumes kennels are numbered by a hall in the facility and a cage. E.g. "A12" for Hall A, Cage 12
Kennel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        hall: {
            type: DataTypes.VARCHAR,
            isAlpha: true,
            validate: {
                len: 1
            }
        },
        cage: {
            type: DataTypes.INT,
            isInt: true,
            validate: {
                len: [1,2]
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'kennel',
    }
);

module.exports = Kennel;
