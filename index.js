var express = require('express');
var app = express();

app.use(express.static(__dirname+'/public'));

app.get('index.html', function(req, res, next) {
    res.sendFile('index.html');
});

app.listen(process.env.PORT||8080)