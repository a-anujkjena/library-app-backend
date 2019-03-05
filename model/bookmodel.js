'use strict';

var mysql = require('../lib/mysql').executeQuery;

module.exports = {

	getbooks: function (id, callback) {
		var query = {
			sql: 'call get_books(?);',
			values: [id]
		};
		mysql(query, function (err, result) {
			callback(err, result);
		});
	},

	returnbook: function (id, callback) {
		var query = {
			sql: 'call return_book(?);',
			values: [id]
		};
		mysql(query, function (err, result) {
			callback(err, result);
		});
	},

	bookcrud: function (bookdata, callback) {
		var query = {
			sql: 'call book_crud_operation(?);',
			values: [bookdata]
		};
		mysql(query, function (err, result) {
			callback(err, result);
		});
	}
}