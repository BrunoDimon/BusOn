const Imagem = require('../models/imagem');

/**
 * Service class for image operations.
 */
class ImagemService {

    /**
     * Constructor for the ImageService class.
     */
    constructor() {
    }

    /**
     * Gets an image.
     * 
     * @param {string} id - The image id.
     * 
     * @returns {Promise} The image.
    */
    async get(id) {
        return await Imagem.findByPk(id);
    }

    /**
     * Deletes an image.
     * 
     * @param {string} id - The image id.
     * 
     * @returns {Promise} The result of the deletion.
    */
    async delete(id) {
        return await Imagem.destroy({
            where: { id: id }
        });
    }
}

module.exports = ImagemService;