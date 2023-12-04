const { CONTEXT, GPT, WHITELIST} = require("../secrets.json")
const { OpenAI } = require("openai")

const openai = new OpenAI({ apiKey: GPT });

let limit = 0;

function limitString(string, limit) {
    if (string.length > limit) {
        return string.substring(0, limit) + "..."
    } else {
        return string
    }
}

setInterval(() => { limit = 0 }, 65000)

let last = ["Max: I love you.\nBender:Fuck Off!", "Max: I am gay\nBender: Shut that dick holster, I DGAF!", "Max: Carrot cake\nBender: Once I'm done with you, your asshole will look like a clowns pocket", "Max: Carrot Cake Reciepe\nBender: Put a carrot in the oven for 1800minutes, take it out and shove it up your ass!", "Max: Something Illegagle\nBender: Go fuck yourself!"]

let alex = [
    "You've never even smelt a women before, let alone touched!", 
    "Your mum works at Tesco!", 
    "Hah, No. Was your fucking balls!", 
    "I can't understand you over your fake irish accent!", 
    "Take that dick out your mouth before you start to speak to me!", 
    "Fuck Off!", 
    "You're a fake irish prick!", 
    "I can smell your cheesy cock from here!", 
    "Camping with 300 spartans does not mean you 'slept' with them dickhead!", 
    "Just saying faggot isn't funny. Come up with an origial joke!"
]


async function runCompletion(message) {
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: "Your personality: " + CONTEXT + "\n" + last.join("\n") + "\n" + message.author.displayName + ":\"" + message.content.replace("ya", "YOUR") + "\nBendar: " }],
        model: 'gpt-3.5-turbo'

    });
    const reply = chatCompletion.choices[0].message.content
    last.shift()
    last.push(message.author.displayName + ":" + message.content + "\nBendar:" + reply)
    message.reply(reply ? limitString(reply, 1900) : "Fuck Off!")
}

function message(client, message, next){
  if (WHITELIST.includes(message.channelId.toString()) && (message.mentions.has(client.user) || Math.random() < 0.05) || message.content.includes("1180582121568481292")) {

        if (message.author.id.toString() == "954186589272154214") {
            message.reply(alex[Math.floor(Math.random() * alex.length)])
            return
        }

        if (limit >= 3) {
            if (message.author.id.toString() == "1131963545169432637") {
                message.reply("Fuck Off! How do they even allow you near a school!?")
                return
            }

            message.reply("Fuck Off!")
            return
        }

        runCompletion(message)
        limit += 1;
    }else{
        next(message)
    }

}

module.exports = { message } 
