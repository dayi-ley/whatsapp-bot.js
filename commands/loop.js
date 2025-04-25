module.exports = {
    name: 'loop',
    aliases: [],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    execute: async (client, message, args) => {
        if (args.length < 2) return message.reply('Uso: !loop <veces> <mensaje>');
        
        const times = parseInt(args[0]);
        const msg = args.slice(1).join(' ');

        if (isNaN(times)) {  // ← Corregí esta línea
            return message.reply('El primer argumento debe ser un número.');
        }

        if (times > 10) {
            return message.reply('Máximo 10 repeticiones por seguridad.');
        }

        for (let i = 0; i < times; i++) {
            await message.reply(msg);
            if (i < times - 1) await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
};
