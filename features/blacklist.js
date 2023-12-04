function message(_client, message, next){

    console.log(message.content)

    if (!message.author.bot) next()

}

module.exports = { message }
