var db = require('../db')
var shortId = require('shortid')
var Session = require('../models/session.model')
module.exports = function(req, res, next){
    if(!req.signedCookies.sessionId){
        var sessionId = shortId.generate()
        res.cookie('sessionId', sessionId,{
            signed:true,
        });
        var newSession = new Session({id:sessionId})
        newSession.save(function(err,result){
            if(err) return console.error(err)
            console.log("Insert Session successfully")
        })
    }
    next()
}