'use strict';

var usermodel = require('../../model/usermodel');

module.exports = {
    loginuser: function(req, res, next) {
        if(req.body.emailid && req.body.password) {
            let userdata = {
                emailid: req.body.emailid,
                password: req.body.password
            }
            usermodel.loginuser(JSON.stringify(userdata),function(err, result){
                if(err) {
                    let error = {
                        status: 403,
                        status_code: 0,
                        message: err
                    }
                    next(error);
                } else {
                    if(result && result[0] && result[0][0]) {
                        if(result[0][0].State) {
                            let error = {
                                status: 403,
                                status_code: 0,
                                message: result[0][0].Message
                            }
                            next(error);
                        } else {
                            req.session.userid = result[0][0].id;
                            req.session.role = result[0][0].role;
                            req.session.finaldata = result[0][0];
                            console.log(JSON.stringify(req.session));
                            next();
                        }
                    } else {
                        let error = {
                            status: 403,
                            status_code: 0,
                            message: "Invalid User"
                        }
                        next(error);
                    }
                }
            });
        } else {
            let error = {
                status: 400,
                status_code: 0,
                message: "Required Parameters are missing"
            }
            next(error);
        }
    },

    getuser: function(req, res, next) {
        usermodel.getuser(function(err, result){
            if(err) {
                let error = {
                    status: 403,
                    status_code: 0,
                    message: err
                }
                next(error);
            } else {
                if(result && result[0] && result[0][0].State) {
                    let error = {
                        status: 403,
                        status_code: 0,
                        message: result[0][0].Message
                    }
                    next(error);
                } else {
                    req.session.finaldata = result[0];
                    next();
                }
            }
        });
    },
 
    checkadmin: function(req, res, next) {
        if( req.session.userid && req.session.role == 'admin') {
            next();
        } else {
            let error = {
                status: 401,
                status_code: 0,
                message: "User is not authorized for this resource"
            }
            next(error); 
        }
    },

    checkuser: function(req, res, next) {
        if(req.session.userid) {
            next();
        } else {
            let error = {
                status: 401,
                status_code: 0,
                message: "User is not authorized for this resource"
            }
            next(error); 
        }
    }
}