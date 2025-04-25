require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Configuración mejorada para Render
const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: './.wwebjs_auth' // Ruta persistente para la sesión
  }),
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--single-process'
    ]
  },
  webVersionCache: {
    type: 'remote',
    remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html'
  }
});

// Manejo mejorado del QR
client.on('qr', qr => {
  console.log('\n=== ESCANEA ESTE QR CON WHATSAPP ===');
  qrcode.generate(qr, { small: true }); // Versión terminal
  console.log(`\nO usa este enlace: https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(qr)}`);
});

// Eventos de conexión mejorados
client.on('authenticated', () => {
  console.log('Autenticación exitosa!');
});

client.on('auth_failure', msg => {
  console.error('Error de autenticación:', msg);
});

client.on('ready', () => {
  console.log('\n✅ BOT LISTO Y CONECTADO');
  console.log(`Nombre: ${client.info.pushname}`);
  console.log(`Número: ${client.info.wid.user}`);
  console.log(`Plataforma: ${client.info.platform}`);
});

// Carga los handlers
try {
  require('./handler/index')(client);
  console.log('Handlers cargados correctamente');
} catch (error) {
  console.error('Error cargando handlers:', error);
}

// Inicialización segura
client.initialize().catch(err => {
  console.error('Error al iniciar el cliente:', err);
});

// Manejo de errores no capturados
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});
