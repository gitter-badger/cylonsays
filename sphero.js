process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');
var Cylon = require('cylon')
	, MAX_SPEED = 60;




	
var util = require('util'),
    Twit = require('twit'),
    _ = require('lodash');
 
//Twitter OAuth Access Tokens
var APP_ACCESS_TOKEN = '18982682-Q0nzq3QReeRwTsVdmV595T9tWT1LlRobRfNbP91T1',
    APP_SECRET_TOKEN = 'dJg1ceuMO0UQSOPp9aXpuxR0pRsjqDb4F4KnRn8wiiuWi',
 
    CONSUMER_KEY = 'AXCl00PqDWoNGH3735SK7g',
    CONSUMER_SECRET = 'N9iavnpLznq8bOJItp2qrXBRvvbmCrhwFZxZqTXLg';
 
var twitter = new Twit({
  consumer_key:         CONSUMER_KEY,
  consumer_secret:      CONSUMER_SECRET,
  access_token:         APP_ACCESS_TOKEN,
  access_token_secret:  APP_SECRET_TOKEN
});
 
var TEAMS = {
  'red' : 0,
  'blue' : 0
}






function spheroWorker(my){
  	var s = my.sphero,
  		redCount = 0, 
  		blueCount = 0
  		;
  	

	console.log("Connected...");
	s.setColor('green');
	s.setBackLED(100);

	function roll(){
		var dir, speed;
		redCount = TEAMS['red'];
		blueCount = TEAMS['blue'];
		if( redCount == blueCount ){
			s.stop();
			s.setColor('green');
			return;
		}else if(redCount > blueCount){
			dir = 1;
			speed = redCount - blueCount;
			s.setColor('red');
		}else{
			dir = 181;
			speed = blueCount - redCount;
			s.setColor('blue');
		}

		// speed = speed * 20;
		// if (speed > MAX_SPEED ) speed = MAX_SPEED;
		speed = 60;

		s.roll(speed, dir);
		console.log("Moving: ", dir);
	}


	// // replace this with the twitters...
	// process.stdin.on('data', function (chunk) {
	// 	text = chunk.toString();
	// 	// console.log(chunk, ' - received data:', text);
	// 	// console.log("Text: ", text);
	// 	var dir;

	// 	switch(text[0]){
	// 		case '\n':
	// 			s.stop();
	// 			return;

	// 		case 'r':
	// 			redCount++;
	// 			break;
	// 		case 'b':
	// 			blueCount++;
	// 			break;

	// 		case 'z':
	// 			throw "Blah!";

	// 		default: return console.log("Failboat:", text);
	// 	}

	// 	console.log("Red:", redCount, "Blue:", blueCount);
	// 	roll();
	// });


 
var COLORS = /(red|blue)/gi;
 
function countTeam(item){
	  if (!item.text) return;
	 
	  console.log(item.text);
	 
	  var matches = item.text.match(COLORS);
	  var uniq;
	  var team;
	 
	  if (matches && matches.length){
	    var uniq = _.uniq(matches, function(team){ return team.toLowerCase(); })
	    var team = uniq.length && uniq[0];
	    var count = TEAMS[team];
	 
	    TEAMS[team] = count + 1;
	  }
	 
	  console.log('TEAMS', TEAMS);

	  roll();
}
 
var stream = twitter.stream('statuses/filter', {track:'#ngconfsphero'});
stream.on('tweet', countTeam);


};

Cylon.robot({
	connection: { name: 'sphero', adaptor: 'sphero', port: '/dev/cu.Sphero-BWG-RN-SPP' },
	device: {name: 'sphero', driver: 'sphero'},
	work: spheroWorker
}).start();