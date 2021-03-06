angular.module('rssApp', ['ngRoute', 'ngProgressLite']);

angular.module('rssApp').config([
  '$routeProvider',
  '$locationProvider',

  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', { controller: 'MainCtrl', templateUrl: '/views/main' })
      .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(true);
  }
]);