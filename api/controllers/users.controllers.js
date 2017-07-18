var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.register = function(req, res) {

  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  if (!user.name || !user.email) {
    res
      .status(200)
      .json({
        message: "please provide email and name",
        stat: 1118
      });
  }
  else {

    user.save(function(err) {
      if (err) {
        console.log("error occured while saving users");
        res.status(200);
        res.json({
          message: "Users exists with this email",
          stat: 1118
        });
      }
      else {
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
          "token": token
        });
      }
    });
  }
};

module.exports.login = function(req, res) {
  passport.authenticate('local', function(err, user, info) {
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token": token
      });
    }
    else {
      // If user is not found
      res.status(200).json({ message: "Username or password is wrong", stat: 1119 });
    }
  })(req, res);
};

module.exports.logout = function(req, res) {
  req.logout();
};