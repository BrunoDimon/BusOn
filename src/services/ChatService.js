const { config } = require("dotenv");
const OpenAI = require("openai");
const AssistantProvider = require('../providers/AssistantProvider');
const ThreadProvider = require("../providers/ThreadProvider");
const MessageProvider = require("../providers/MessageProvider");
const AssistantContextInstruction = require('../entity/AssistantContextInstruction');
const AssistantQueryResponse = require("../entity/AssistantQueryResponse");
const AssistantQueryDataInstructions = require("../entity/AssistantQueryDataInstructions");

/**
 * Represents a chat service for a personal assistant.
 */
class ChatService {

    /**
     * @var openai: OpenAI
     */
    openai;

    /**
     * @var assistantProvider: AssistantProvider
     */
    assistantProvider;

    /**
     * @var threadProvider: ThreadProvider
     */
    threadProvider;

    /**
     * @var messageProvider: MessageProvider
     */
    messageProvider;

    /**
     * @var assistantContextInstruction: assistantContextInstruction
     */
    assistantContextInstruction;

    /**
     * @var assistantQueryResponse: assistantQueryResponse
     */
    assistantQueryResponse;

    /**
     * @var assistantQueryDataInstructions: assistantQueryDataInstructions
     */
    assistantQueryDataInstructions;

    /**
     * Constructor for the ChatService class.
     */
    constructor() {
        config();
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
        this.assistantProvider = new AssistantProvider(this.openai);
        this.threadProvider = new ThreadProvider(this.openai);
        this.messageProvider = new MessageProvider(this.openai);
        this.assistantContextInstruction = new AssistantContextInstruction();
        this.assistantQueryResponse = new AssistantQueryResponse();
        this.assistantQueryDataInstructions = new AssistantQueryDataInstructions();
    }

    /**
     * Sends a message to the assistant.
     * 
     * @param {string} message The message to send to the assistant.
     * 
     * @returns {Promise<{prompt:string, content:string}>} The response from the assistant.
    */
    async messageAssistant(prompt) {
        const assistant = await this.assistantProvider.getAssistant();
        const thread = await this.threadProvider.getThread();

        const contextInstruction = await this.assistantContextInstruction.toString(prompt);

        const query = await this.messageProvider.sendMessage(contextInstruction, assistant, thread.thread);

        const data = await this.assistantQueryResponse.getDatabaseDataFromQuery(query);

        if (data.earlyReturn) {
            return {
                prompt: prompt,
                content: data.message,
                data: data,
                query: query,
                contextInstruction: contextInstruction
            };
        }

        const promptWithQuery = await this.assistantQueryDataInstructions.toString(prompt, data);

        const content = await this.messageProvider.sendMessage(promptWithQuery, assistant, thread.thread);

        return {
            prompt: prompt,
            content: content,
            query: query,
            data: data,
            promptWithQuery: promptWithQuery,
            contextInstruction: contextInstruction
        };
    }
}

module.exports = ChatService;