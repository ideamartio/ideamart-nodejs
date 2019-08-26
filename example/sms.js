var IdeaMart = require('../');
var http = require('http');

var SMS = new IdeaMart.SMS({
  applicationID: 'APP_000001',
  password: 'password',
  url: 'http://localhost:7000/sms/send'
});

// Send a text message to multiple customers
SMS.sendTextMessage({
  destination: ["tel:94777484484","tel:94771234567"], //Send to multiple destinations
  message: 'This is a test. I hope you get this message.',
  deliveryStatus: false
}, function(error, status) {
  console.log(status);
});

// Send a text message to the customer
SMS.sendTextMessage({
  destination: "tel:94777484484", //Send to single destination
  message: 'This is a test. I hope you get this message.',
  deliveryStatus: false
}, function(error, status) {
  console.log(status);
});

// Is emitted when a text message is sent to the web application
SMS.on('message', function(message){
  console.log(message);
});

// Create an http server and run a webhook to recieve messages
http.createServer(function(request, response){
  SMS.messageHandler(request, response, function(error){
    response.statusCode = 404;
    response.end('Nope. You\'ve visited the wrong page, buddy.');
  });
}).listen(5556);
