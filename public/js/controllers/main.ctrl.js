angular.module('rssApp').controller('MainCtrl', [
  '$scope',
  'FeedService',

  function($scope, FeedService) {
    $scope.entries = [];
    $scope.newFeed = {};

    FeedService.all().then(function(data) {
      $scope.feeds = data;      
    });

    $scope.create = function() {
      FeedService.create($scope.newFeed.url).then(function(data) {
        console.log(data);
      })
    };

    $scope.fetch = function(url) {
      FeedService.fetch(url).then(function(feed) {
        $scope.entries = feed.entries;
      });
    };
  }
]);