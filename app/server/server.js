var express = require('express'),
    app     = express(),
    server  = require('http').createServer(app),
    path    = require('path');


var root = path.resolve(__dirname, '../public');

app.use(express.static(root));


// app.get('/', function(req, res){
//     res.sendFile(root + '/index.html');
// });


app.get('/test', function(req, res){
    res.send("HELLO");
});


server.listen(8080);
console.log('Listening on port 8080...');

module.exports = app;

