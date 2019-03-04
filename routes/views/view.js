'use strict';

module.exports = {

    normalview: function(req, res, next) {
        let finaldata = {
            status_code : 1,
            data: req.session.finaldata
        }
        req.session.finaldata=null;
        res.status(200);
        res.json(finaldata);
    }
}