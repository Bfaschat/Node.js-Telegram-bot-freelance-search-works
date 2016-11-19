var TelegramBot = require('node-telegram-bot-api');
var config = require('./config/config.json');
var CronJob = require('cron').CronJob;
var request = require('request'); 
var parser = require('xml2json');
var JSON5 = require('json5');
var Entities = require('html-entities').XmlEntities;
 
var entities = new Entities();

// replace the value below with the Telegram token you receive from @BotFather
var token = config.api;

// Create a bot that uses 'polling' to fetch new updates
var bot = new TelegramBot(token, { polling: true });

// Matches "/echo [whatever]"
bot.onText(/test/, function (msg, match) {3
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  var chatId = msg.chat.id; 
  console.log(chatId);

  // send back the matched "whatever" to the chat
 
});


//new CronJob('*/1 * * * *', function() {
//  console.log('You will see this message every second');

//}, null, true, 'America/Los_Angeles');
  
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

request('https://www.upwork.com/ab/feed/jobs/atom?category2=web_mobile_software_dev&subcategory2=web_development&api_params=1&q=&securityToken=8e9980e5aa4941a133b3bce71d67a3aab8a7e62f9f4fe87a8bdbd06bdfae552c51522fbc9e51217a5cfa99750dc40277cd2889c6c236a1775f6a885dc57fee91&userUid=698527874227384320', function (error, response, body) {
  if (!error && response.statusCode == 200) {

    console.log( new Date + "  success request"); // Show the HTML for the Google homepage. 
      var json = parser.toJson(body); 
      var obj = JSON5.parse(json); 
      var arrayItems= obj.feed.entry; 
        var $i;
        for( $i=0; $i<= arrayItems.length; $i++){
 
          if(arrayItems[$i]){
          var replaceStringBody = arrayItems[$i].content['$t'].replace(/(<([^>]+)>)/ig,"\n");
          var redyBody = replaceStringBody.replace( "click to apply",""); 
         
          bot.sendMessage(config.chatid,  arrayItems[$i].title['$t'] + " \n " +  entities.decode(redyBody) + "\n " + arrayItems[$i].link.href  );
          sleep(2000); 
          }
        }
 
  }else if (error){

    console.log(error);

  }
})   
