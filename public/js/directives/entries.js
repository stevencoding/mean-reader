angular.module('rssApp').directive('entries', [
  '$sce',

  function() {
    return {
      restrict: 'C',
      templateUrl: '/views/entries',
      controller: function($scope, $sce) {
        $scope.select = function(entry) {
          $scope.article = entry;

          if (typeof $scope.article.content === 'string') {
            $scope.article.content = $sce.trustAsHtml($scope.article.content);
          }

          _.forEach($scope.entries, function(entry) { entry.isActive = false; });

          entry.isActive = true;
        };
      }
    };
  }
]);