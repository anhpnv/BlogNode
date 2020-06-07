const User = require('../models/user.model')

module.exports.index = async (req,res) => {
    var user = await User.find()
    res.render('users/index',{
        name: user
    })
}
module.exports.search = async function(req,res){
    var q = req.query.q
    var users = await User.find()
    var matchedUsers = users.filter(function(user){
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
    req.body.avatar = req.file.path.split('/').slice(1).join("/")
    var newUser = new User(req.body)
    newUser.save(function(err, doc){
        if (err) return console.error(err);
        res.redirect('/users')
        console.log("Document inserted sucessfully")
    })
}
module.exports.id = async function(req,res){
    var id = req.params.id;
    var user = await User.find({id})
    res.render('users/view',{
        user
    })
}