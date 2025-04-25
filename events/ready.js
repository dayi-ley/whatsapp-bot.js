module.exports = {
    name: "ready",
    run(client) {
        console.log(`✅ Bot conectado como ${client.info.pushname}`);
    }
};
