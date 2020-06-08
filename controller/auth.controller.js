var User = require('../models/user.model')
module.exports.getLogin = function(req,res){
    res.render('auth/login')
}
module.exports.postLogin = async function(req,res){
    var email = req.body.email;
    var password = req.body.password;
    var user = await User.find({ email:email}).sort();
    if(user.length === 0){
        console.log(req.body)
        res.render('auth/login',{
            errors:[
                'User does not exist.'
            ],
            value: req.body
        })
        return;
    }
    if(user[0].password !== password){
        res.render('auth/login',{
            errors: [
                'Wrong password.'
            ],
            value:req.body
        })
        return;
    }
    res.cookie('userId', user[0].id,{
        signed:true,
    });
    res.redirect('/users');
}