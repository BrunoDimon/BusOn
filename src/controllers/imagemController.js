'use strict';

const ImagemService = require('../services/ImagemService');
const service = new ImagemService();

// Controller para obter imagem por id
const obterImagemPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const imagem = await service.get(id);

        if (!imagem || !imagem.imagem || !Buffer.isBuffer(imagem.imagem)) {
            throw new Error('Imagem não encontrada ou formato inválido.');
        }

        const imageBuffer = Buffer.from(imagem.imagem, 'base64');
        const base64Image = imageBuffer.toString('binary')
        const mimeType = 'image/jpg';

        res.writeHead(200, {
            'Content-Type': mimeType,
            'Content-Length': base64Image.length
        });
        return res.end(`data:${mimeType};base64,${base64Image}`);
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao obter imagem', error: error.message });
    }
};

// Controller para excluir imagem
const excluirImagem = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await service.delete(id);
        if (result) {
            return res.status(200).json({ message: 'Imagem excluída com sucesso.' });
        }
        throw new Error('Imagem não encontrada.');
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir imagem', error: error.message });
    }
};

// Controller para salvar uma imagem
const salvarImagem = async (req, res) => {
    const { imagem } = req.body;
    try {
        const image = await service.create({ imagem });
        if (image) {
            return res.status(201).json({
                message: 'Imagem criada com sucesso.',
                id: image.id
            });
        }
        throw new Error('Erro ao criar imagem.');
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar salvar imagem.', error: error.message });
    }
};

module.exports = {
    obterImagemPorId,
    salvarImagem,
    excluirImagem
};
