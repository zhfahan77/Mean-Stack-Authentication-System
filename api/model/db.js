// Require all necessary files
var mongoose = require("mongoose");
var dburl = "mongodb://localhost/ratingmama";

var db = mongoose.connect(dburl);
mongoose.Promise = global.Promise;

mongoose.connection.on("connected", function() {
   console.log("Mongodb is connected"); 
});

mongoose.connection.on("disconnected", function() {
   console.log("Mongodb is disconnected"); 
});

mongoose.connection.on("error", function(err) {
   console.log(err); 
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
function gracefulShutdown(msg, callback) {
  mongoose.connection.close(function() {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
}

// For nodemon restarts
process.once('SIGUSR2', function() {
  gracefulShutdown('nodemon restart', function() {
    process.kill(process.pid, 'SIGUSR2');
  });
});
// For app termination
process.on('SIGINT', function() {
  gracefulShutdown('App termination (SIGINT)', function() {
    process.exit(0);
  });
});
// For Heroku app termination
process.on('SIGTERM', function() {
  gracefulShutdown('App termination (SIGTERM)', function() {
    process.exit(0);
  });
});

require("./users.model.js");