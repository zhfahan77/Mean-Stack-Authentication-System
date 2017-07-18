angular.module('authentication').controller('registerController', registerController);

function registerController($location, authentication) {
    var vm = this;

    vm.credentials = {
      name : "",
      email : "",
      password : ""
    };

    vm.onSubmit = function () {
      authentication
        .register(vm.credentials)
        .catch(function(err){
          
        })
        .then(function(response, err){
          if(response === undefined) {
            err = vm.error;
            vm.error = "User Exists with this email, please try to login";
          } else {
          $location.path('stream');
          }
        });
    };
}