const { glob } = require("glob");
const path = require('path');

module.exports = async (client) => {
    // Inicialización de comandos (adaptado para WhatsApp)
    if (!client.commands) client.commands = new Map();

    // Carga de comandos
    const commandFiles = await glob(`${process.cwd()}/commands/**/*.js`);
    
    for (const filePath of commandFiles) {
        const command = require(filePath);
        if (command.name && command.run) {
            client.commands.set(command.name, command);
            console.log(`✅ Comando cargado: ${command.name}`);
        }
    }

    // Carga de eventos (opcional)
    const eventFiles = await glob(`${process.cwd()}/events/*.js`);
    for (const file of eventFiles) {
        const event = require(file);
        if (event.name && event.run) {
            client.on(event.name, (...args) => event.run(client, ...args));
            console.log(`✅ Evento cargado: ${event.name}`);
        }
    }
};
