'use strict';

const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const { buildWhereClause } = require('../utils/buildWhereClause');
const { buildOrderByClause } = require('../utils/buildOrderByClause');

// Controller para obter um usuário de ônibus pelo ID
const obterUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const usuarioOnibus = await Usuario.findByPk(id);
        if (usuarioOnibus) {
            return res.status(200).json(usuarioOnibus);
        }
        throw new Error('Usuário de ônibus não encontrado.');
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter usuário de ônibus', error: error.message });
    }
};

// Controller para obter todos os usuários de ônibus
const obterTodosUsuarios = async (req, res) => {
    try {
        const whereClause = buildWhereClause(req.query.filters);
        const orderClause = buildOrderByClause(req.query.orderBy);

        const usuariosOnibus = await Usuario.findAll({
            where: whereClause,
            order: orderClause
        });
        res.status(200).json(usuariosOnibus);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao obter todos os usuários de ônibus', error: error.message });
    }
};

// Controller para criar um novo usuário de ônibus
const criarUsuario = async (req, res) => {
    const { nome, email, telefone, endereco, curso, associacao, tipo_acesso, senha, situacao } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(senha, 15);
        const novoUsuarioOnibus = await Usuario.create({
            nome,
            email,
            telefone,
            endereco,
            curso,
            associacao,
            tipo_acesso,
            senha: hashedPassword,
            situacao
        });
        res.status(201).json(novoUsuarioOnibus);
    } catch (error) {
        console.error('Erro ao cadastrar usuário', error);
        res.status(500).json({ message: 'Erro ao criar novo usuário de ônibus', error: error.message });
    }
};

// Controller para atualizar um usuário de ônibus existente
const atualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const [atualizado] = await Usuario.update(req.body, {
            where: { id: id }
        });
        if (atualizado) {
            const usuarioOnibusAtualizado = await Usuario.findByPk(id);
            return res.status(200).json(usuarioOnibusAtualizado);
        }
        throw new Error('Usuário de ônibus não encontrado ou não atualizado.');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao atualizar usuário de ônibus', error: error.message });
    }
};

// Controller para excluir um usuário de ônibus
const excluirUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const excluido = await Usuario.destroy({
            where: { id: id }
        });
        if (excluido) {
            return res.status(200).json({ message: 'Usuário de ônibus excluído com sucesso.' });
        }
        throw new Error('Usuário de ônibus não encontrado ou não excluído.');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao excluir usuário de ônibus', error: error.message });
    }
};

module.exports = {
    obterUsuarioPorId,
    obterTodosUsuarios,
    criarUsuario,
    atualizarUsuario,
    excluirUsuario
};
