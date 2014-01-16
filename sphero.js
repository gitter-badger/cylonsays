process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');
var Cylon = require('cylon')
	, MAX_SPEED = 80;

function workFn(my){
  	var s = my.sphero,
  		redCount = 0, 
  		blueCount = 0;
  	

	console.log("Connected...");
	s.setColor('green');
	s.setBackLED(100);

	function roll(){
		var dir, speed;
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

		speed = speed * 20;
		if (speed > MAX_SPEED ) speed = MAX_SPEED;

		s.roll(speed, dir);
		console.log("Moving: ", dir);
	}


	// replace this with the twitters...
	process.stdin.on('data', function (chunk) {
		text = chunk.toString();
		// console.log(chunk, ' - received data:', text);
		// console.log("Text: ", text);
		var dir;

		switch(text[0]){
			case '\n':
				s.stop();
				return;

			case 'r':
				redCount++;
				break;
			case 'b':
				blueCount++;
				break;

			case 'z':
				throw "Blah!";

			default: return console.log("Failboat:", text);
		}

		console.log("Red:", redCount, "Blue:", blueCount);
		roll();
	});
};


Cylon.robot({
	connection: { name: 'sphero', adaptor: 'sphero', port: '/dev/cu.Sphero-BWG-RN-SPP' },
	device: {name: 'sphero', driver: 'sphero'},
	work: workFn
}).start();