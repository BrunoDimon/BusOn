'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../../databaseConnection');
const SituacaoPagamentoEnum = require('../enum/SituacaoPagamentoEnum');
const TipoPagamentoEnum = require('../enum/TipoPagamentoEnum');

const Usuario = require('./usuario');

const Pagamento = sequelize.define('pagamento', {
    txId: {
        type: DataTypes.STRING,
        allowNull: true
    },
    pixCopiaCola: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    },
    tipo: {
        type: DataTypes.ENUM(Object.keys(TipoPagamentoEnum)),
        allowNull: false,
    },
    valor: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    multa: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    dataVencimento: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    dataPagamento: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    situacao: {
        type: DataTypes.ENUM(Object.keys(SituacaoPagamentoEnum)),
        allowNull: false,
    },

});

Pagamento.belongsTo(Usuario, { foreignKey: 'usuarioId' });

module.exports = Pagamento;