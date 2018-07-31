var express = require('express'),
    fs = require('fs'),
    app = express();
//    eps = require('ejs'),
//    morgan = require('morgan');

var app = express();

var ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';



// app is running!
app.get('/', function(req, res) {
    res.send('na sola da bota! '+ new Date());
    res.send('na palma da mão! '+ new Date());
});



app.listen(8080, ip);



module.exports = app;
