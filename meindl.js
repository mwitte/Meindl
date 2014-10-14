// websocket's default listen port
var port = 6060;
// enable configurable
if(process.argv[2] && typeof parseInt(process.argv[2]) === 'number') {
    port = parseInt(process.argv[2]);
}

var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: port});
var say = require('say');

wss.on('connection', function(ws) {
    console.log('aaaaa');
    ws.on('message', function(message) {

        var msg, voice = 'Ralph';

        try {
            msg = JSON.parse(message);
        }catch (e) {
            console.log('Unkown message type with content: ' + message);
            return;
        }

        // set specific voice if given
        if(msg.voice) voice = msg.voice;

        ws.send('processing: ' + msg.text);
        say.speak(voice, msg.text, function() {
            ws.send('done: ' + msg.text);
        });
    });
});

console.log("Meindl successfully started, listening on port " + port);