var db = require('../db')
var shortId = require('shortid')
module.exports = function(req, res, next){
    if(!req.signedCookies.sessionId){
        var sessionId = shortId.generate()
        res.cookie('sessionId', sessionId,{
            signed:true,
        });
        db.get('sessions').push({
            id: sessionId
        }).write()
    }
    next()
}