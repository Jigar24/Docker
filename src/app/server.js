'use strict'
var express = require("express");
var app = express();
var path = require('path');
var querystring = require('querystring');
var url = require('url');
const redis = require('redis');
const client = redis.createClient();
var bodyParser = require('body-parser');
//TODO: replace filename to Bot
var bot = require("../../bot.js")
console.log(bot);
class Serve {

  constructor() {
    app.use("/", express.static(path.join(__dirname, 'public')));

    app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
        extended: true
        }));

    app.get('/',function(req,res) {
      res.render('index.html');
    });

    app.post('/', function(req, res){
        var obj = {}
        obj = req.body;
        console.log("Form data");
        console.log(obj.uid);
        client.set(obj.uid,`{${obj.app},${obj.maintainer},${obj.repo},${obj.token}, ${obj.framework}, ${obj.db}, ${obj.port}`);

        res.end("Your request for new docker file is being processed. Bot will respond with the file soon.")
    });
    var server = app.listen(8081, function(){
            var host = 'localhost';
            var port = server.address().port;
            console.log("Listening on http://" + host + ":" + port);
       });
  }
}
module.exports = Serve;
