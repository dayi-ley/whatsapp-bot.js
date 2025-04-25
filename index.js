require('dotenv').config();
 const { Client, LocalAuth } = require('whatsapp-web.js');
 
 const client = new Client({
   authStrategy: new LocalAuth(),
   puppeteer: {
     args: [
       '--no-sandbox',
       '--disable-setuid-sandbox',
       '--disable-dev-shm-usage',
       '--single-process'
     ]
   }
 });
 
 // QR sin dependencias externas
 // QR sin dependencias adicionales
 client.on('qr', qr => {
   console.log('🔍 Escanea este QR con WhatsApp:');
   console.log('🔍 Escanea este QR con WhatsApp Web:');
   console.log(`https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(qr)}`);
   console.log('Código QR alternativo:', qr);
 });
 
 client.on('ready', () => {
   console.log('✅ Bot conectado correctamente');
   console.log('✅ Bot listo para recibir mensajes');
 });
 
 // Carga handlers
 try {
   require('./handler/index')(client);
 } catch (error) {
   console.error('Error cargando handlers:', error);
 }
 
 client.initialize();
client.on('message', async (message) => {
    // Ignorar mensajes propios o de otros bots
    if (message.fromMe) return;

    // Procesar comandos
    for (const [name, cmd] of client.commands) {
        if (message.body.startsWith(`!${name}`)) {
            await cmd.run(client, message);
            break;
        }
    }
});
