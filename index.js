// https://discord.com/api/oauth2/authorize?client_id=1180582121568481292&permissions=8&scope=bot+applications.commands
const { TOKEN, MESSAGE_FEATURES } = require("./secrets.json")
const { Client, Events, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] });

function chain_message_features(features, index, message, client){
    if (index >= features.length) return () => {};
    return features[index](client, message, () => chain_message_features(features, index+1, message, client))
}

console.log(MESSAGE_FEATURES)

const message_features = []
for (const f of MESSAGE_FEATURES){
    message_features.push(require(f).message)
}

client.on(Events.MessageCreate, message => {

    chain_message_features(message_features, 0, message, client)

})

client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(TOKEN)

console.log("Hello World")

