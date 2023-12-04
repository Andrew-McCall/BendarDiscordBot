function message(_client, message, next) {
    if (message.content == "maximusprime") {

        console.log("channel id:", message.channel.id)
    return
}



    next(message)
}

module.exports = { message }
