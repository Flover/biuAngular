/*
 * Serve JSON to our AngularJS client
 */

exports.name = function (req, res) {
  res.json({
    name: 'Bob'
  });
};

exports.movies = function(req, res) {
	res.json(
	[
      {'id': '5',
      'title': 'hi',
      'link': 'sth',
      'creator': 'kek',
      'description': 'lul'},
      {'id': '3',
      'title': 'aj',
      'link': 'sth',
      'creator': 'woot',
      'description': 'lul'}
    ]
	)
}