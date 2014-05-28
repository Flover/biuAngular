
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  errorhandler = require('errorhandler'),
  morgan = require('morgan'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path'),
  mongoose = require('mongoose'),
  models = require('./model/models');

var app = module.exports = express();


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
  app.use(errorhandler());
}

// producion only
if (env === 'production') {
  // TODO
}


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/name', api.name);
app.get('/api/movies', api.movies);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

var server = http.createServer(app);

var io = require('socket.io').listen(server);
io.sockets.on('connection',function(socket){
  socket.on('login', function(username){
    models.User.findOne({username: username}, function(err, user){

    });
  });

  socket.on('register', function(username){
    var user = new models.User({username: username});
    user.save(function(err){
      if(err)
        console.log(err);
    });
  })

  socket.on('getMovies', function(){
    socket.join("all");

    models.Movie.find({}, function(err, movies){
      if(err)
        console.log(err);
      else{
        socket.emit('allMovies',movies);
        socket.broadcast.to('all').emit('allMovies',movies);
      }
    });
  });

  socket.on('getMovie', function(id){
    models.Movie.findOne({_id: id}, function(err, movie){
      if (err)
        console.log(err);
      else
        socket.emit('oneMovie',movie);
    })
  })

  socket.on('addNew', function(movie){
    var newMovie = new models.Movie({title: movie.title, link: movie.link, creator: movie.creator, description: movie.description});
    newMovie.save(function(err){
      if(err) 
        console.log(err)
      else{
        socket.emit('updateMovies');
        socket.broadcast.to('all').emit('updateMovies');
      }
    });
  });

  socket.on('deleteMovie', function(id){
    models.Movie.remove({ _id: id }, function(err){
      if (err)
        console.log(err);
      else{
        socket.emit('updateMovies');
        socket.broadcast.to('all').emit('updateMovies');
      }
    });
  });

  socket.on('disconnect',function(){
    socket.leave("all");
  });
});

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});