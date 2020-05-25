var express = require('express')
const db = require('../db')
const shortid = require('shortid')
var router = express.Router()

router.get('',(req,res) => {
    res.render('users/index',{
        name: db.get("users").value()
    })
})

router.get('/search',function(req,res){
    var q = req.query.q
    var matchedUsers = db.get("users").value().filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
    })
    res.render('users/index',{
        name:matchedUsers
    })
})
router.get('/create', function(req, res){
    res.render('users/create');
})
router.post('/create', function(req,res){
    req.body.id = shortid.generate()
    db.get('users').push(req.body).write()
    res.redirect('/users')
})

router.get('/:id',function(req,res){
    var id = req.params.id;
    var user = db.get('users').find({id}).value()
    res.render('users/view',{
        user
    })
})

module.exports = router