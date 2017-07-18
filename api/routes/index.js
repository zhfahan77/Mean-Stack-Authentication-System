// Require all necessary files
var express = require("express");
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: 'MY_SECRET',
    credentialsRequired: false,
    getToken: function fromHeaderOrQuerystring(req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        }
        else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }
});

// require controllers

var ctrlUsers = require("../controllers/users.controllers.js");


//user
router
    .route('/users/login')
    .post(ctrlUsers.login);

router
    .route('/users/register')
    .post(ctrlUsers.register);
router
    .route('/users/logout')
    .get(auth, ctrlUsers.logout);

// export the router module
module.exports = router;