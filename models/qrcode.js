const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class QRCode extends Model {}

Photo.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        url: {
            type: DataTypes.VARCHAR,
            validate: {
                isUrl: true
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'qrcode'
    }
);

module.exports = QRCode;
