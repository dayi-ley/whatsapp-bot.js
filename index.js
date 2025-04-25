client.on('ready', () => {
  console.log('✅ Bot listo. Datos de sesión:', {
    pushname: client.info?.pushname,
    platform: client.info?.platform,
    battery: client.info?.battery
  });
});

// Debug de conexión
client.on('change_state', state => {
  console.log('🔄 Estado de conexión:', state);
});

// Manejo explícito de mensajes
client.on('message', async (msg) => {
  try {
    console.log(`📩 Mensaje de ${msg.from}: ${msg.body}`);
    
    const prefix = process.env.PREFIX || '!';
    if (!msg.body.startsWith(prefix)) return;

    const [cmd, ...args] = msg.body.slice(prefix.length).split(/ +/);
    const command = client.commands?.[cmd.toLowerCase()];

    if (command) {
      console.log(`⚡ Ejecutando comando: ${command.name}`);
      await command.execute(client, msg, args);
    }
  } catch (error) {
    console.error('Error procesando mensaje:', error);
  }
});
