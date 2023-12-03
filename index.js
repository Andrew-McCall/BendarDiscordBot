const {CONTEXT, WHITELIST, GPT, TOKEN} = require("./secrets.json")
const {OpenAI }=  require("openai")

let limit = 0;

function limitString(string, limit){
if (string.length > limit) {
        return string.substring(0, limit) + "..."
      } else {
              return string
            }
}

setInterval(() => {limit = 0}, 65000)

let last = ["Max: I love you.\nBender:Fuck Off!", "Max: I am gay\nBender: Shut that dick holster, I DGAF!", "Max: Carrot cake\nBender: Once I'm done with you, your asshole will look like a clowns pocket"]

let alex = [ "You've never even smelt a women before, let alone touched!", "Your mum works at Tesco!", "Hah, No. Was your fucking balls!", "I can't understand you over your fake irish accent!", "Take that dick out your mouth before you start to speak to me!", "Fuck Off!", "You're a fake irish prick!", "I can smell your cheesy cock from here!", "Camping with 300 spartans does not mean you 'slept' with them dickhead!", "Just saying faggot isn't funny. Come up with an origial joke!"]

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

    if (WHITELIST.includes(interaction.channelId.toString()) && (interaction.mentions.has(client.user) || Math.random() < 0.05) || interaction.content.includes("1180582121568481292")){
    
if (interaction.author.id.toString() == "954186589272154214")         {
    interaction.reply(alex[Math.floor(Math.random()*alex.length)])
    return
}

        if (limit >= 3){
            if (interaction.author.id.toString() == "1131963545169432637"){
                interaction.reply("Fuck Off! How do they even allow you near a school!?")
                return
            }

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
        messages: [{ role: 'user', content: "Your personality: "+ CONTEXT + "\n" + last.join("\n")+ "\n" + message.author.displayName +":\"" + message.content.replace("ya", "YOUR") + "\nBendar: " }],
    model: 'gpt-3.5-turbo'
  
  });
 const reply = chatCompletion.choices[0].message.content
    last.shift()
    last.push(message.author.displayName + ":"+message.content+"\nBendar:" +reply)
message.reply(reply ? limitString(reply, 1900) : "Fuck Off!")
}

client.login(TOKEN)
