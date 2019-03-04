'use strict';

var mysql = require('../lib/mysql').executeQuery;

module.exports = {

	loginuser: function(data, callback) {
		var query = {
			sql: 'call login_user(?);',
			values: [data]
		};
		mysql(query, function(err, result) {
			callback(err, result);
		});
	}
}