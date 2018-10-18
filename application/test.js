var socket = require('socket.io-client')('http://localhost:3000');

export  var result = [0,2];
    socket.on('test', function(data){
      if (data != "Welcome"){
        result = data;
        console.log(result);
      }

    });
