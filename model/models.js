var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/biuAngular");

var movieSchema = new Schema({
	userId: String,
	title: String,
	link: String,
	creator: String,
	description: String
});

var userSchema = new Schema({
	username: String
});

exports.Movie = mongoose.model('Movie', movieSchema);
exports.User = mongoose.model('User', userSchema);
