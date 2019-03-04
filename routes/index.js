'use strict';

var user = require('./controller/user');
var view = require('./views/view');


module.exports = function(app) {
	app.get('/',function(req, res, next){
		res.json({status:'working'});
    });

    app.post('/v1/login',user.loginuser,view.normalview);
}