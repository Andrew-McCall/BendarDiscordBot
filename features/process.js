function message(_client, message, next){
    message.content = message.content.toLowerCase();
    next();
}

module.exports = { message }
