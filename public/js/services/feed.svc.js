angular.module('rssApp').factory('FeedService', [
  '$http',

  function($http) {
    return {
      fetch: function(url) {
        var promise = $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=100&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));

        return promise.then(function(res) {
          return res.data.responseData.feed;
        });
      },

      all: function() {
        var promise = $http.get('/api/feeds');

        return promise.then(function(res) {
          return res.data;
        });
      },

      create: function(url) {
        return this.fetch(url).then(function(feed) {
          var params = {
            name: feed.title,
            url: feed.feedUrl,
            description: feed.description,
            link: feed.link
          };

          var promise = $http.post('/api/feeds', angular.toJson(params));

          return promise.then(function(res) {
            return res.data;
          });
        });
      },

      article: function(url) {
        var promise = $http.get('/api/articles?url=' + url);

        return promise.then(function(res) {
          return res.data;
        });
      }
    };
  }
]);