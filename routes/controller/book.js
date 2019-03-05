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
                        if(result[0][0].State) {
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
       
    },

    returnbook: function(req, res, next) {
        if(req.query.id) {
            bookmodel.returnbook(req.query.id,function(err, result){
                if(err) {
                    let error = {
                        status: 403,
                        status_code: 0,
                        message: err
                    }
                    next(error);
                } else {
                    if(result && result[0] && result[0][0]) {
                        if(result[0][0].State && result[0][0].State == -1) {
                            let error = {
                                status: 403,
                                status_code: 0,
                                message: result[0][0].Message
                            }
                            next(error);
                        } else if(result[0][0].State && result[0][0].State == 1) {
                            req.session.finaldata = [];
                            req.session.message = "Book Return Successfully";
                            next();
                        }else {
                            let error = {
                                status: 403,
                                status_code: 0,
                                message: "Something Went Wrong"
                            }
                            next(error);
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
       
    },

    bookcrud: function(req, res, next) {
        if(req.body.action) {
            if(req.body.action == 'insert' && (!req.body.Title || !req.body.Author || !req.body.Year)) {
                let error = {
                    status: 403,
                    status_code: 0,
                    message: "Required Data is missing for Insertion"
                }
                next(error);
            } else if((req.body.action == 'update' || req.body.action == 'delete') && !req.body.id) {
                let error = {
                    status: 403,
                    status_code: 0,
                    message: "Required Data is missing for Updation"
                }
                next(error);
            } else {
                if((req.body.Member_Id && req.body.Member_Id != '0') && (!req.body.Date_of_Issue || !req.body.Date_Of_Return)) {
                    let error = {
                        status: 403,
                        status_code: 0,
                        message: "Required Data is missing for Issue"
                    }
                    next(error);
                } else {
                    let data = {
                        id: req.body.id ? req.body.id : null,
                        Title: req.body.Title ? req.body.Title : null,
                        Author: req.body.Author ? req.body.Author : null,
                        Year: req.body.Year ? req.body.Year : null,
                        action: req.body.action 
                    }
                    if(req.body.Member_Id && req.body.Date_of_Issue && req.body.Date_Of_Return) {
                        data.Member_Id = req.body.Member_Id ? req.body.Member_Id : null;
                        data.Date_of_Issue = req.body.Date_of_Issue ? req.body.Date_of_Issue : null;
                        data.Date_Of_Return = req.body.Date_Of_Return ? req.body.Date_Of_Return : null;
                    }
                    bookmodel.bookcrud(JSON.stringify(data),function(err, result){
                        if(err) {
                            let error = {
                                status: 403,
                                status_code: 0,
                                message: err
                            }
                            next(error);
                        } else {
                            if(result && result[0] && result[0][0]) {
                                if(result[0][0].State && result[0][0].State == -1) {
                                    let error = {
                                        status: 403,
                                        status_code: 0,
                                        message: result[0][0].Message
                                    }
                                    next(error);
                                } else if(result[0][0].State && result[0][0].State == 1) {
                                    req.session.finaldata = [];
                                    req.session.message = "Operation Done Successfully";
                                    next();
                                }else {
                                    let error = {
                                        status: 403,
                                        status_code: 0,
                                        message: "Something Went Wrong"
                                    }
                                    next(error);
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
                }
            }
        } else {
            let error = {
                status: 403,
                status_code: 0,
                message: "Action is missing"
            }
            next(error);
        }
    }
}