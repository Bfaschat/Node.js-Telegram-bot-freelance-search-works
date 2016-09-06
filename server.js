import telegram from 'telegram-bot-api';
import config from "config/config.json";

var api = new telegram({
    token: config.api
});

api.getMe()
    .then(function(data) {
        console.log(data);
    })
    .catch(function(err) {
        console.log(err);
    });