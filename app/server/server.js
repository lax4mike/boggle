var express = require('express'),
    app     = express(),
    server  = require('http').createServer(app),
    path    = require('path');


var root = path.resolve(__dirname, '../public');

app.use(express.static(root));




server.listen(3000);
console.log('Listening on port 3000...');

module.exports = app;

