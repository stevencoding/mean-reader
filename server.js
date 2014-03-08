var express = require('express'),
    app     = express();

app.configure('development', function() {
  app.use(express.logger('dev'));
  app.set('views', __dirname + '/public/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});

app.configure('production', function() {
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/dist');
  app.use(express.static(__dirname + '/dist'));
});

exports.index = function(req, res) {
  res.render('index');
};

app.get('/', exports.index);

var port = Number(process.env.PORT || 5000);
app.listen(port);
console.log('Server running on localhost:' + port);