var express = require('express');
var fs = require('fs');

var app = express();
app.use(express.logger());

app.get('/', function(request, response) {
  var html = fs.readFileSync("index.html");
  response.send(html.toString('utf8')); //converts buffer to string
});

app.get('/quiz.js', function(request, response) {
  var js = fs.readFileSync("quiz.js");
  response.send(js.toString('utf8')); //converts buffer to string
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});