const express = require('express')
const db = require('./db')
const bodyParser = require('body-parser')
const shortid = require('shortid')
const app = express()
const port = 3000

app.set('view engine','pug')
app.set('views','./views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', function(req,res){
    res.render('index',{
        name:'AAA'
    })
})

app.get('/users',(req,res) => {
    res.render('users/index',{
        name: db.get("users").value()
    })
})

app.get('/users/search',function(req,res){
    var q = req.query.q
    var matchedUsers = db.get("users").value().filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
    })
    res.render('users/index',{
        name:matchedUsers
    })
})
app.get('/users/create', function(req, res){
    res.render('users/create');
})
app.post('/users/create', function(req,res){
    req.body.id = shortid.generate()
    db.get('users').push(req.body).write()
    res.redirect('/users')
})

app.get('/users/:id',function(req,res){
    var id = req.params.id;
    var user = db.get('users').find({id}).value()
    res.render('users/view',{
        user
    })
})
app.listen(port, () => console.log("Example app listening on port " + port))
