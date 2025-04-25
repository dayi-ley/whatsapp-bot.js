module.exports = {
    name: "ping",  // Nombre del comando (ej: "!ping")
    description: "Responde con 'pong'",
    async run(client, message) {
        if (message.body === '!ping') {
            await message.reply('🏓 pong');
        }
    }
};
