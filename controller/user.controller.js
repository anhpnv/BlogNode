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
    console.log(req.cookies)
    res.render('users/create');
}
module.exports.postUser = function(req,res){
    req.body.id = shortid.generate()
    req.body.avatar = req.file.path.split('/').slice(1).join("/")
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