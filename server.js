import Telegram from 'telegram-node-bot';
import config from "config/config.json";


const TELEGRAMEBASECONTROLLER = Telegram.TelegramBaseController;
const TG = new Telegram.Telegram(config.api);

class PingController extends TELEGRAMEBASECONTROLLER {
    /**
     * @param {Scope} $
     */
    pingHandler($) {
        $.sendMessage('pong')
    }

    get routes() {
        return {
            'ping': 'pingHandler'
        }
    }
}

TG.router
    .when(['ping'], new PingController())