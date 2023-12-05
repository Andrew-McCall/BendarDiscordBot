const TEA_TIME_SERVER_ID = "1069900470761566248"

function isNaughty(text) {
    return text.includes("fag") || text.includes("faggot") || text.includes("nigg")
}


function message(_client, message, next) {

    if (isNaughty(message.content.toLowerCase().replace(" ", "").replace("1", "i").replace("0", "o"))) {
        message.reply("Naughty Naughty <@"+message.author.id+">...\nNow you can't speak for 5 minutes!").then(() => {
            message.delete()
        })
        
        let member = message.member
        if (member && message.guildId == TEA_TIME_SERVER_ID) {
            console.log("Timedout: " + message.author.tag)
            try{
                member.timeout(5*60*1000, "Said a naughty word!")
            }catch(error){
                console.log("Couldn't timeout")
            }
             
        }
    }
    else {
        next()
    }

}

module.exports = { message } 
