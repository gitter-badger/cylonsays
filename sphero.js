var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'sphero', adaptor: 'sphero', port: '/dev/cu.Sphero-ROR-AMP-SPP' },
  device: {name: 'sphero', driver: 'sphero'},

  work: function(my) {
  	var s = my.sphero;


	console.log("Connected...");

	var col = 0xFF0000;

    var stop = false;
	s.setRGB([col]);



	// s.detectCollisions();

	// every((1).second(), function() { 
 //    	// s.roll(60, Math.floor(Math.random() * 360));
 //    	col = (col & 0xfefefe) << 1;
 //    	s.setRGB([col]);
 //    });

	process.stdin.resume();
	process.stdin.setEncoding('utf8');
	var util = require('util');

	var running = false;
	process.stdin.on('data', function (text) {
	console.log('received data:', util.inspect(text));

	if( running ){
		s.stop();
	}else{
		s.roll(60, 100);
	}
		running = !running;
	});
  }
}).start();