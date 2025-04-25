const { Events } = require('whatsapp-web.js');

module.exports = {
    name: Events.READY,
    execute: (client) => {
        console.log(`✅ Bot listo como ${client.info.pushname || 'Usuario'}`);
    }
};
