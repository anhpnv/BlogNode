const db = require('../db')
const shortid = require('shortid')

module.exports.index = (req,res) => {
    res.render('users/index',{
        name: db.get("users").value()
    })
}
module.exports.search = function(req,res){
    var q = req.query.q
    var matchedUsers = db.get("users").value().filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
    })
    res.render('users/index',{
        name:matchedUsers
    })
}

module.exports.getUser = function(req, res){
    res.render('users/create');
}
module.exports.postUser = function(req,res){
    req.body.id = shortid.generate()
    var errors = []
    if(!req.body.name){
        errors.push('Name is required')
    }
    if(!req.body.phone){
        errors.push('Phone is required')
    }
    if(errors.length){
        res.render('users/create',{
            errors,
            value: req.body
        })
        return;
    }
    db.get('users').push(req.body).write()
    res.redirect('/users')
}
module.exports.id = function(req,res){
    var id = req.params.id;
    var user = db.get('users').find({id}).value()
    res.render('users/view',{
        user
    })
}