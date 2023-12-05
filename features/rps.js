const { PREFIX } = require("../secrets.json")

const rps = ["rock", "paper", "scissors"];

function message(_client, message, next){
    if (message.content.startsWith(PREFIX + "rps")){
        
        let msg_split = message.content.split(" ")
        if (msg_split.length != 2){
            message.reply("Invaild Arguments: Please use " + PREFIX + "rps <rock|paper|scissors>")
            return
        }

        let choice;
        if (msg_split[1] == "rock" || msg_split[1] == "r"){
           choice = 0
        } else if (msg_split[1] == "paper" || msg_split[1] == "p"){
            choice = 1
        }
        else if (msg_split[1] == "scissors" || msg_split[1] == "s"){
            choice = 2
        } else {
            message.reply("Invaild Arguments: Please use " + PREFIX + "rps <rock|paper|scissors>")
            return
        }

        let botChoice = Math.floor(Math.random() * 3)
        let result = (choice - botChoice + 3) % 3

        if (result == 0){
            message.reply("Bendar Choose '" + rps[botChoice] + "'\nTie!")
            
        } else if (result == 1){ 
            message.reply("Bendar Choose '" + rps[botChoice] + "'\nYou Win!")
        }
        else if (result == 2){
            message.reply("Bendar Choose '" + rps[botChoice] + "'\nYou Lose!")
        }
    }
    else{
        next()
    }
}

module.exports = { message }
