import telegram from 'telegram-bot-api';
import config from "config/config.json";

var api = new telegram({
    token: config.api
});

api.on('message', function(message) {
    var chat_id = message.chat.id;

    // It'd be good to check received message type here
    // And react accordingly
    // We consider that only text messages can be received here

    api.sendMessage({
            chat_id: message.chat.id,
            text: message.text ? message.text : 'This message doesn\'t contain text :('
        })
        .then(function(message) {
            console.log(message);
        })
        .catch(function(err) {
            console.log(err);
        });
});