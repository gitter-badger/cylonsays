var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'sphero', adaptor: 'sphero', port: '/dev/cu.Sphero-RWY-AMP-SPP' },
  device: {name: 'sphero', driver: 'sphero'},

  work: function(my) {
  	var s = my.sphero;
  	s.setBackLED(100);


	console.log("Connected...");
	s.setColor('green');

	process.stdin.resume();
	process.stdin.setEncoding('utf8');
	var util = require('util');

	var redCount = 0, blueCount = 0;

	var running = false;
	process.stdin.on('data', function (chunk) {
		text = chunk.toString(); // util.inspect(chunk);
		console.log(chunk, ' - received data:', text);

		console.log("Text: ", text);
		var dir;

		switch(text[0]){
			case '\n':
				s.stop();
				return;

			case 'r':
				redCount++;
				dir = 0;
				break;
			case 'b':
				blueCount++;
				dir = 180;
				break;

			case 'z':
				throw "Blah!";

			default: return console.log("Failboat:", text);
		}

		console.log("Red:", redCount, "Blue:", blueCount);


		if( redCount == blueCount ){
			s.stop();
			s.setColor('green');
			return;
		}else if(redCount > blueCount){
			dir = 1;
			s.setColor('red');
		}else{
			dir = 181;
			s.setColor('blue');
		}

		console.log("Moving: ", dir);
		s.roll(60, dir);
	});
  }
}).start();