angular.module('authentication').controller('privateController', streamController);

function streamController($window, $route) {
    var vm = this;
    vm.logout = function() {
        if ($window.localStorage['token']) {
            delete $window.localStorage['token'];
            $route.reload();
        }
        else {
            $route.reload();
        }
    };
    
}