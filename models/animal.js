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
            type: DataTypes.VARCHAR,
            allowNull: false
        },
        chip: {
            type: DataTypes.VARCHAR(15),
            validate: {
                len: [9,15],
                isAlphanumeric: true,
                unique: true
            }
        },
        species_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        breed_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        color_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        behaviors_id: {
            type: DataTypes.INTEGER,
        },
        kennel_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        photo_id: {
            type: DataTypes.INTEGER,
            unique: true,
            isUrl: true
          }
          ,
        qrcode_id: {
            type: DataTypes.INTEGER,
            unique: true,
            isUrl: true
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
