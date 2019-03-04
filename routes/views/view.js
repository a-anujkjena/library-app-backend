'use strict';

module.exports = {

    normalview: function(req, res, next) {
        let finaldata = {
            status_code : 1,
            data: req.session.finaldata
        }
        res.status(200);
        res.json(finaldata);
    }
}