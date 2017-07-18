angular.module('authentication').factory('AuthInterceptor', AuthInterceptor);

function AuthInterceptor($location, $q, $window) {
    return {
        request: request
    };

    function request(config) {
        config.headers = config.headers || {};
        if ($window.localStorage.token) {
            config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
        }
        return config;
    }
}
