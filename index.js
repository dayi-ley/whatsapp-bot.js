require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--single-process'
    ]
  }
});

// QR sin dependencias externas
client.on('qr', qr => {
  console.log('🔍 Escanea este QR con WhatsApp:');
  console.log(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(qr)}`);
});

client.on('ready', () => {
  console.log('✅ Bot conectado correctamente');
});

// Carga handlers
try {
  require('./handler/index')(client);
} catch (error) {
  console.error('Error cargando handlers:', error);
}

client.initialize();
