// const User = require('../models/user.model')
// module.exports.requireAuth = function(req, res, next){
//     if(!req.signedCookies.userId){
//         res.redirect('/auth/login');
//         return;
//     }
//     console.log(User.find({id:req.signedCookies.userId}).name)
//     console.log(req.signedCookies.userId)
//     var user = User.find({id:req.signedCookies.userId}).name
//     if(!user){
//         res.redirect('/auth/login');
//         return;
//     }
//     res.locals.user = user;
//     next();
// }