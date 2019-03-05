'use strict';

module.exports = {

    normalview: function(req, res, next) {
        let finaldata = {
            status_code : 1,
            data: req.session.finaldata,
            message: req.session.message ? req.session.message : null
        }
        req.session.finaldata=null;
        res.status(200);
        res.json(finaldata);
    }
}