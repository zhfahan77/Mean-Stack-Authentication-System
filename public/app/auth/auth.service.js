angular.module('authentication').service('authentication', authentication);

function authentication ($http, $window, $location) {

    var saveToken = function (token) {
      $window.localStorage['token'] = token;
    };

    var getToken = function () {
      return $window.localStorage['token'];
    };

    var isLoggedIn = function() {
      var token = getToken();
      var payload;

      if(token === 'undefined' || !token || token === null){
        return false;
      } else {
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return payload.exp > Date.now() / 1000;
      }
    };

    var currentUser = function() {
      if(isLoggedIn()){
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
        return {
          email : payload.email,
          name : payload.name,
          id: payload._id,
        };
      }
    };
    
    var error = function(error) {
      return error;
    };

    var register = function(user, err) {
      return $http.post('/api/users/register', user).then(function(data){
        if(data.data.stat === 1118) {
          return err;
        } else {
        saveToken(data.data.token);
        return data;
        }
      });
    };

    var login = function(user, err) {
      return $http.post('/api/users/login', user).then(function(data) {
        if(data.data.stat === 1119) {
          return err;
        } else {
        saveToken(data.data.token);
        return data;
        }
      });
    };

    return {
      currentUser : currentUser,
      saveToken : saveToken,
      getToken : getToken,
      isLoggedIn : isLoggedIn,
      register : register,
      login : login,
      error: error
    };
  }