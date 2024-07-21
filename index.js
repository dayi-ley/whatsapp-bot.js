const { Client, LocalAuth } = require('whatsapp-web.js');
const QRCode = require('qrcode');
require('dotenv').config();

const wwebVersion = "2.2412.54"

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        
    },
    webVersionCache: {
        type: 'remote',
        remotePath: "https://cdn.jsdelivr.net/gh/pedroslopez/whatsapp-web.js@v" + wwebVersion + "/dist/whatsapp-web.js"
    }
});

client.on('qr', (qr) => {
    QRCode.toString(qr, { type: 'terminal', small: true }, function (err, url) {
        console.log(url);
    });
});

require('./handler/index')(client);

module.exports = client;
// create a colletion
client.commands = new Array();

client.initialize();