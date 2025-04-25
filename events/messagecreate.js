const { Events } = require('whatsapp-web.js');

module.exports = {
    name: Events.MESSAGE_RECEIVED,
    execute: (client, msg) => {
        const prefix = process.env.PREFIX || '!';
        
        if (msg.body.startsWith(prefix)) {
            const [cmd, ...args] = msg.body
                .slice(prefix.length)
                .trim()
                .split(/ +/g);

            const command = client.commands[cmd] || 
                Object.values(client.commands).find(c => c.aliases?.includes(cmd));

            if (command) {
                command.execute(client, msg, args);
            }
        }
    }
};
