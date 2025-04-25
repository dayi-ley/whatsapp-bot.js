const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_TOKEN);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

module.exports = {
    name: 'gemini',
    aliases: ['gem'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    execute: async (client, message, args) => {
        if (!args.length) return message.reply('Debes ingresar un prompt.');

        try {
            const prompt = args.join(' ');
            const result = await model.generateContent(prompt);
            const response = await result.response;
            await message.reply(response.text());
        } catch (err) {
            await message.reply(`Error: ${err.message}`);
        }
    }
};
