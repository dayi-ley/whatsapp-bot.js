const { Client, LocalAuth } = require('whatsapp-web.js');
require('dotenv').config();

const wwebVersion = "2.2412.54";

// Inicializa el cliente
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    },
    webVersionCache: {
        type: 'remote',
        remotePath: `https://cdn.jsdelivr.net/gh/pedroslopez/whatsapp-web.js@v${wwebVersion}/dist/whatsapp-web.js`
    }
});

// Inicializa commands como objeto ANTES de los handlers
client.commands = {};  // Objeto en lugar de Map para compatibilidad

// Handler QR mejorado
client.on('qr', (qr) => {
    console.log('🔍 Escanea este QR:');
    console.log(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(qr)}`);
});

// Carga los handlers
require('./handler/index')(client);

// Servidor HTTP para Render
require('http').createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot activo');
}).listen(process.env.PORT || 3000);

client.initialize();
