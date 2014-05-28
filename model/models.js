var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

mongoose.connect("mongodb://necromos:necromos@ds033559.mongolab.com:33559/biuangular");

var movieSchema = new Schema({
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