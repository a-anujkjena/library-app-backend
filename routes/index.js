'use strict';

var user = require('./controller/user');
var book = require('./controller/book');
var view = require('./views/view');


module.exports = function(app) {
	app.get('/',function(req, res, next){
		res.json({status:'working'});
    });

    app.post('/v1/login',user.loginuser,view.normalview);
    app.get('/v1/userlist',user.getuser,view.normalview);
    app.get('/v1/booklist',book.getbook,view.normalview);
    app.get('/v1/returnbook',book.returnbook,view.normalview);
    app.post('/v1/bookcrud',book.bookcrud,view.normalview);
}