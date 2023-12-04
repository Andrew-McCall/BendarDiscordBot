function message(_client, message, next){

    if (message.content.toLowerCase().replace(" ", "").includes("faggot")) {
        message.reply("You're one to talk, your mum has no arms or legs and sleeps in a pillow case!\nPAHAHAHAHAHAHAHA").then(() => {
            message.delete()
        })
    }
    else{
        next()
    }

}

module.exports = { message } 
