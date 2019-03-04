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
                    if(result[0] && result[0][0]) {
                        if(result[0][0].status) {
                            let error = {
                                status: 403,
                                status_code: 0,
                                message: result[0][0].message
                            }
                            next(error);
                        } else {
                            req.session.finaldata = result[0][0];
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
    }
}