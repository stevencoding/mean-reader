angular.module('rssApp').controller('MainCtrl', [
  '$scope',
  'FeedService',

  function($scope, FeedService) {
    $scope.newFeed = {};

    FeedService.all().then(function(data) {
      console.log(data);      
    });

    $scope.create = function() {
      FeedService.create($scope.newFeed).then(function(data) {
        console.log(data);
      })
    };
  }
]);