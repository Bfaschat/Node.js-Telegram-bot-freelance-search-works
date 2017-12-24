var TelegramBot = require('node-telegram-bot-api');
var config = require('./config/config.json');
var CronJob = require('cron').CronJob;
var request = require('request'); 
var parser = require('xml2json');
var JSON5 = require('json5');
var Entities = require('html-entities').XmlEntities;
 var sleep = require('sleep');
var entities = new Entities(); 
 
var token = config.api;
 
var bot = new TelegramBot(token, { polling: true });
 // get chat id using messaging
bot.onText(/test/, function (msg, match) { 
  var chatId = msg.chat.id; 
  console.log(chatId);
 
 
});


new CronJob('*/3 * * * *', function() {
 
 	/// console.log('You will see this message every 3 minutes');
 getJobs();


}, null, true, 'America/Los_Angeles');

function getJobs(){
	request('https://www.upwork.com/ab/feed/jobs/atom?category2=web_mobile_software_dev&subcategory2=web_development&api_params=1&q=&securityToken='+ config.securitytoken +'&userUid='+ config.userid +'', function (error, response, body) {
		if (!error && response.statusCode == 200) {
	
			console.log( new Date + "  success request");  
				var json = parser.toJson(body); 
				var obj = JSON5.parse(json); 
				var arrayItems= obj.feed.entry; 
					var $i;
					//console.log(arrayItems.length);
					for( $i=0; $i<= arrayItems.length; $i++){
	 
						if(arrayItems[$i]){
				 
						var replaceStringBody = arrayItems[$i].content['$t'].replace(/(<([^>]+)>)/ig,"\n");
				 
						var redyBody = replaceStringBody.replace( "click to apply",""); 
					 
						bot.sendMessage(config.chatid,  arrayItems[$i].title['$t'] + " \n " +  entities.decode(redyBody) + "\n " + arrayItems[$i].link.href  );
						
							//console.log($i);
						
	
						}
	
						sleep.sleep(10);
					
					}
	 
		}else if (error){
	
			console.log(error);
	
		}
	})  

}
