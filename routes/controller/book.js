'use strict';

var bookmodel = require('../../model/bookmodel');

module.exports = {
    getbook: function(req, res, next) {
        if(req.query.id) {
            bookmodel.getbooks(req.query.id,function(err, result){
                if(err) {
                    let error = {
                        status: 403,
                        status_code: 0,
                        message: err
                    }
                    next(error);
                } else {
                    if(result && result[0] && result[0][0]) {
                        if(result[0][0].status) {
                            let error = {
                                status: 403,
                                status_code: 0,
                                message: result[0][0].message
                            }
                            next(error);
                        } else {
                            req.session.finaldata = result[0];
                            next();
                        }
                    } else {
                        let error = {
                            status: 403,
                            status_code: 0,
                            message: "No Record Found"
                        }
                        next(error);
                    }
                }
            });
        } else {
            let error = {
                status: 403,
                status_code: 0,
                message: "ID is missing"
            }
            next(error);
        }
       
    }
}