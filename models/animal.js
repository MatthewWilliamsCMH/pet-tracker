const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Animal extends Model {}

Animal.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        sex: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^[MF]$/,
                len: [1]
            }
        },
        altered: {
            type: DataTypes.BOOLEAN
        },
        chip: {
            type: DataTypes.STRING,
            validate: {
                len: [9,15],
                isAlphanumeric: true,
                unique: true
            }
        },
        species_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'species',
                key: 'id'
            }
        },
        breed_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'breed',
                key: 'id'
            }
        },
        color_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'color',
                key: 'id'
            }
        },
        kennel_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'animal',
    }
);

module.exports = Animal;
