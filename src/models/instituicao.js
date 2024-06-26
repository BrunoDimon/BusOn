'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../databaseConnection');
const associacao = require('./associacao');
const AtivoInativoEnum = require('../enum/AtivoInativoEnum');

const Instituicao = sequelize.define('instituicao', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    situacao: {
        type: DataTypes.ENUM(Object.keys(AtivoInativoEnum)),
        allowNull: false,
    },
    associacaoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: associacao,
            key: 'id'
        }
    },
    logoUrl: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

module.exports = Instituicao;