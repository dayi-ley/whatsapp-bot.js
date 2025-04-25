const { glob } = require("glob");
const path = require('path');

module.exports = async (client) => {
    // Inicialización segura
    if (!client.commands) {
        client.commands = {};
    }

    // Carga de comandos
    const commandFiles = await glob(`${process.cwd()}/commands/**/*.js`);
    
    commandFiles.forEach((filePath) => {
        const command = require(filePath);
        const splitted = filePath.split(path.sep);
        const directory = splitted[splitted.length - 2];

        if (command.name) {
            // Usamos asignación de objeto en lugar de push
            client.commands[command.name] = {
                ...command,
                directory
            };
        }
    });

    // Carga de eventos
    const eventFiles = await glob(`${process.cwd()}/events/*.js`);
    eventFiles.forEach((file) => require(file));
};
