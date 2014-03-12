angular.module('rssApp').controller('MainCtrl', [
  '$sce',
  '$scope',
  'ngProgressLite',
  'FeedService',

  function($sce, $scope, ngProgressLite, FeedService) {
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
      ngProgressLite.start();
      FeedService.fetch(url).then(function(feed) {
        $scope.entries = feed.entries;
        ngProgressLite.done();
      });
    };

    $scope.fetchContent = function(url) {
      ngProgressLite.start();
      FeedService.article(url).then(function(data) {
        $scope.article.content = $sce.trustAsHtml(data.data);
        ngProgressLite.done();
      });
    }
  }
]);