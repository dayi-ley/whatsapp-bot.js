const { Client, LocalAuth } = require('whatsapp-web.js');
require('dotenv').config();

const wwebVersion = "2.2412.54";

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'] // Requerido para Render
    },
    webVersionCache: {
        type: 'remote',
        remotePath: `https://cdn.jsdelivr.net/gh/pedroslopez/whatsapp-web.js@v${wwebVersion}/dist/whatsapp-web.js`
    }
});

// QR como URL (fácil de escanear desde móvil)
client.on('qr', (qr) => {
    console.log('🔍 Escanea este QR con WhatsApp Web:');
    console.log(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(qr)}`);
    console.log(`⚠️ Si el enlace no funciona, copia este código manualmente:\n${qr}`);
});

// Handler de comandos (sin cambios)
require('./handler/index')(client);

// Servidor HTTP mínimo para Render
require('http').createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot activo. Este endpoint es solo para Render.');
}).listen(process.env.PORT || 3000);

client.initialize();
