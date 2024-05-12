const Curso = require('../models/curso');
const Instituicao = require('../models/instituicao');
const Usuario = require('../models/usuario');
const Associacao = require('../models/associacao');
const Pagamento = require('../models/pagamento');

/**
 * Represents assistant query response.
 */
class AssistantQueryResponse {

    /**
     * @var query: string
     */
    query;

    constructor(query) {
        this.query = query;
    }

    /**
     * Method to read the query.
     * 
     * @param {string} query The query to read.
     * 
     * @returns {Promise<object>}
    */
    async readQuery() {
        let dados;
        try {
            console.log(this.query);
            if (this.query === '204') {
                return {
                    error: true,
                    message: 'Não foi possível identificar a intenção da pergunta.'
                };
            }

            // Converter a string de consulta em um objeto JavaScript
            const queryObject = JSON.parse(this.query);

            // Extrair o nome do modelo e os critérios de busca
            const { model, where } = queryObject;

            let dbModel;
            switch (model) {
                case 'usuarios':
                    dbModel = Usuario;
                    break;
                case 'pagamentos':
                    dbModel = Pagamento;
                    break;
                case 'instituicoes':
                    dbModel = Instituicao;
                    break;
                case 'cursos':
                    dbModel = Curso;
                    break;
                case 'associacaos':
                    dbModel = Associacao;
                    break;
            }

            // Buscar dados do banco de dados
            const result = await dbModel.findAll({
                where: where
            });

            dados = JSON.stringify(result);

        } catch (error) {
            console.error(error);
            return {
                error: true,
                message: 'Não foi possível buscar dados da aplicação.',
                trace: error
            };
        }

        return {
            error: false,
            content: dados
        }
    }

}

module.exports = AssistantQueryResponse;