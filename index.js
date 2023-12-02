const {CONTEXT, WHITELIST, GPT, TOKEN} = require("./secrets.json")
const {OpenAI }=  require("openai")

let limit = 0;

setInterval(() => {limit = 0}, 65000)

console.log("Hello World")
// https://discord.com/api/oauth2/authorize?client_id=1180582121568481292&permissions=8&scope=bot+applications.commands

const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] });

client.on(Events.MessageCreate, interaction => {
if (interaction.content == "maximusprime"){console.log("channel id:", interaction.channel.id)}

    console.log(interaction.content)
    if (interaction.author.bot) return;

    if (interaction.content.toLowerCase().replace(" ", "").includes("faggot")){
        interaction.reply("You're one to talk, your mum has no arms or legs and sleeps in a pillow case!\nPAHAHAHAHAHAHAHA")
    }

    if (WHITELIST.includes(interaction.channelId.toString()) && (interaction.mentions.has(client.user) || Math.random() < 0.01)){
    
if (interaction.author.id.toString() == "954186589272154214")         {
    interaction.reply("Eww, How about no? Wash your fucking balls, you specky shit!")
    return
}
        if (limit >= 3){
            interaction.reply("Fuck Off!")
            return
        }

        runCompletion(interaction)
        limit += 1;
    }

})

client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

const openai = new OpenAI({apiKey:GPT});


async function runCompletion (message) {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: CONTEXT + "\n" + message.author.displayName +":\"" + message.content + "\"" }],
    model: 'gpt-3.5-turbo'
  
  });
 const reply = chatCompletion.choices[0].message.content
message.reply(reply ? reply : "Fuck Off!")
}

client.login(TOKEN)
