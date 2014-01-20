var util = require('util'),
    Twit = require('twit');


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

var hashRegEx = new RegEx('#', 'g'),
    atRegEx = new RegEx('@', 'g'),
    cylonRegEx = new RegEx('cylon', 'g');

var sayWat = function(item){
    if (!item.text) return;
    var msg = (item.text+"\n")
        .replace(hashRegEx, ' hashtag ')
        .replace(atRegEx, ' at ')
        .replace(cylonRegEx, ' sighlon ');
        // 'sighlon' is pronounced the way we expect 'cylon' to be
    
    console.log(msg);
    util.error(msg);
};

var logStdErr = function(z){
    var zz = z;
    return function(x) { util.error(zz+" - "+util.inspect(x)); };    
}

var stream = twitter.stream('statuses/filter', {track:'#cylonsays'});
stream.on('tweet', sayWat);

stream.on('connect', logStdErr('CONNECT'));
stream.on('disconnect', logStdErr('DISCONNECT'));
stream.on('reconnect', logStdErr('RECONNECT'));
stream.on('limit', logStdErr('LIMIT'));
stream.on('warning', logStdErr('WARNING'));
