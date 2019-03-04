'use strict';

var mysql = require('../lib/mysql').executeQuery;

module.exports = {

	getbooks: function(id, callback) {
		var query = {
			sql: 'call get_books(?);',
			values: [id]
		};
		mysql(query, function(err, result) {
			callback(err, result);
		});
    }
}