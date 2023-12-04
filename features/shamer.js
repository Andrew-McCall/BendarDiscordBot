
function isNaughty(text) {

    return text.includes("fag") || text.includes("faggot") || text.includes("nigg") 

}

function message(_client, message, next){

    if (isNaughty(message.content.toLowerCase().replace(" ", "").replace("1", "i").replace("0", "o"))) {
        message.reply("You're one to talk, your mum has no arms or legs and sleeps in a pillow case!").then(() => {
            message.delete()
        })
    }
    else{
        next()
    }

}

module.exports = { message } 
