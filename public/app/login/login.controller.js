angular.module('authentication').controller('loginController', loginController);

function loginController($location, authentication, $route) {
  var vm = this;

  vm.credentials = {
    email: "",
    password: ""
  };

  vm.onSubmit = function() {
    authentication
      .login(vm.credentials)
      .catch(function(err) {
      })
      .then(function(response, err) {
        if (response === undefined) {
          err = vm.error;
          vm.error = "Incorrect Password or email";
        }
        else {
          $location.path('private');
        }
      });
  };
}