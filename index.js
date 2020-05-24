const express = require('express')
const db = require('./db')
const bodyParser = require('body-parser')
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
    db.get('users').push(req.body).write()
    res.redirect('/users')
})
app.listen(port, () => console.log("Example app listening on port " + port))
