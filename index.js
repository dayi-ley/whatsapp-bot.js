const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal'); // Cambiamos a qrcode-terminal
require('dotenv').config();

const wwebVersion = "2.2412.54";

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox'] // ¡Necesario para Render!
    },
    webVersionCache: {
        type: 'remote',
        remotePath: `https://cdn.jsdelivr.net/gh/pedroslopez/whatsapp-web.js@v${wwebVersion}/dist/whatsapp-web.js`
    }
});

// QR Mejorado (2 opciones)
client.on('qr', (qr) => {
    // Opción 1: Muestra el QR como URL (fácil de escanear desde el navegador)
    console.log('🔍 Escanea este QR con WhatsApp Web:');
    console.log(`https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(qr)}`);

    // Opción 2: QR en terminal (más grande que el original)
    qrcode.generate(qr, { small: false });
});

// Handler de comandos (no lo modificamos)
require('./handler/index')(client);

// Servidor HTTP ficticio para Render (¡IMPORTANTE!)
require('http').createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot activo. Este endpoint es solo para Render.');
}).listen(process.env.PORT || 3000);

client.initialize();
