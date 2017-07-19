angular.module('authentication', ['ngRoute']).config(config).run(run);

function config($routeProvider, $httpProvider, $locationProvider) {

    $httpProvider.interceptors.push('AuthInterceptor');

    $routeProvider
        .when('/', {
            templateUrl: 'app/main/main.html',
            controllerAs: 'vm'
        })
        .when('/private', {
            templateUrl: 'app/private/private.html',
            controller: 'privateController',
            controllerAs: 'vm',
            needLogin: true
        })
        .when('/login', {
            templateUrl: 'app/login/login.html',
            controller: 'loginController',
            controllerAs: 'vm',
            ifLogged: true
        })
        .when('/register', {
            templateUrl: 'app/register/register.html',
            controller: "registerController",
            controllerAs: 'vm',
            ifLogged: true
        })
        .otherwise({
            redirectTo: '/404',
            templateUrl: 'app/main/404.html'
        });
    
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('');
}

function run($rootScope, $location, authentication) {
    $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
        if (nextRoute.needLogin !== undefined && !authentication.isLoggedIn() && nextRoute.needLogin) {
            $location.path('/login');
        }
    });
    
    $rootScope.$on('$routeChangeStart', function (event, nextRoute, currentRoute) {
        if (authentication.isLoggedIn() && nextRoute.ifLogged) {
            $location.path('/private');
        }
    });
}