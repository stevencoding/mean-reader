var express   = require('express'),
    app       = express(),
    mongoose  = require('mongoose'),
    db        = mongoose.connection;

app.configure('development', function() {
  app.use(express.logger('dev'));
  app.set('views', __dirname + '/public/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public/.tmp'));
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});

db.on('error', console.error);

var Feed = mongoose.model('Feed', {
  name: String,
  url: String,
  link: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

mongoose.connect('mongodb://localhost/meanreader');

app.post('/api/feeds', function(req, res) {
  var feed = new Feed({
    name: req.body.name,
    url: req.body.url,
    description: req.body.description,
    link: req.body.link
  });

  feed.save(function(err, feed) {
    if (err) return console.error(err);
    return res.json(feed);
  })
});

app.get('/api/feeds', function(req, res) {
  Feed.find(function(err, feeds) {
    if (err) console.error(err);
    return res.json(feeds);
  });
});

exports.index = function(req, res) {
  res.render('index');
};

exports.views = function(req, res) {
  res.render(req.params.name);
};

app.get('/', exports.index);
app.get('/views/:name', exports.views);

var port = Number(process.env.PORT || 5000);
app.listen(port);
console.log('Server running on localhost:' + port);