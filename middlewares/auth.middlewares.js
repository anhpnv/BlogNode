const User = require('../models/user.model')
module.exports.requireAuth = async function(req, res, next){
    if(!req.signedCookies.userId){
        res.redirect('/auth/login');
        return;
    }
    console.log(req.signedCookies.userId)
    var user = await User.find({_id:req.signedCookies.userId}).sort()
    console.log(user[0])
    if(!user){
        res.redirect('/auth/login');
        return;
    }
    res.locals.user = user[0];
    next();
}