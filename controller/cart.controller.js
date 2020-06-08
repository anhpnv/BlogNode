var db = require('../db')
var Session = require('../models/session.model')
module.exports.addToCart = function(req, res){
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;
    console.log(sessionId)
    if(!sessionId){
        res.redirect('/products')
        return
    }
    var count = db.get('sessions').find({id:sessionId}).get('cart.' + productId,0)
    db.get('sessions').find({id:sessionId}).set('cart.' + productId,count + 1).write()
    res.redirect('/products')
}