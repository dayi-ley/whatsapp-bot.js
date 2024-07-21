const { Client } = require('whatsapp-web.js');

module.exports = {
    name: 'loop',
    aliases: [],
    /** 
     * @param {Client} client 
     * @param {} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {
        // split the message by spaces and get the last element as the number of times to loop
        const times = parseInt(args.pop())
        // join the rest of the message
        const msg = args.join(' ')
        // check if the message is empty
        if (!msg) return message.reply('Debes ingresar un mensaje.')
        // check if the number of times is a number
        if (isNaN(times)) return message.reply('Debes ingresar un número.')
        // loop the message the number of times
        for (let i = 0; i < times; i++) {
            message.reply(msg)
        }

    }
}