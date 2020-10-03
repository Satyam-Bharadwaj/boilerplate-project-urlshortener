'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var cors = require('cors');

var app = express();
//bodyParser Configuration
app.use(bodyParser.urlencoded({extended: false}));
// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.DB_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
let data = [];
let dataSize=0;
app.post("/api/shorturl/new",(req,res)=>{
data.push(req.body.url);
dataSize=dataSize+1;
res.send({original_url:req.body.url,short_url:dataSize-1});
});

app.get("/api/shorturl/:short_url",(req,res)=>{
  var src_url = data[req.params.short_url];
  res.redirect(src_url);
});

app.listen(port, function () {
  console.log('Node.js listening ...');
});