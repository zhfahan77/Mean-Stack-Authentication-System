// Require all necessary files
require("./api/model/db.js");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");
var passport = require("passport");
var cookieParser = require("cookie-parser");

require('./api/config/passport.js');

// Middlewere to log request
app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json 
app.use(bodyParser.json());

// Use express static to show static contents
app.use(express.static(path.join(__dirname, 'public')));

// api routes
var apiroutes = require("./api/routes");
app.use('/api', apiroutes);

// declaring ports
var port = process.env.PORT || 3000;

// listening to port and logging
app.listen(port);
console.log("Application is running on " + port);