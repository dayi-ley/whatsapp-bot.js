module.exports = {
    name: 'sticker',
    aliases: ['st'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    execute: async (client, message, args) => {
        if (!message.hasQuotedMsg) {
            return message.reply('Responde a una imagen para convertirla en sticker.');
        }

        try {
            const quotedMessage = await message.getQuotedMessage();
            if (!quotedMessage.hasMedia) {
                return message.reply('El mensaje citado no contiene medios.');
            }

            const media = await quotedMessage.downloadMedia();
            await message.reply(media, null, { sendMediaAsSticker: true });
        } catch (err) {
            await message.reply(`Error al crear sticker: ${err.message}`);
        }
    }
};
