'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../databaseConnection');

const Imagem = sequelize.define('imagem', {
    imagem: {
        type: DataTypes.BLOB('long'),
        allowNull: true
    }
})

module.exports = Imagem;