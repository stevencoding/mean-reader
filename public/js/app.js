angular.module('rssApp', ['ngRoute']);

angular.module('rssApp').config([
  '$routeProvider',
  '$locationProvider',

  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', { controller: 'MainCtrl', templateUrl: '/views/main' })
      .otherwise({ redirectTo: '/' });
  }
]);