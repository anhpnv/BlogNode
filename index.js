const express = require('express')
const app = express()
const port = 3000

var users = [
    {id: 1,name: 'Viet Anh'},
    {id: 2,name: 'Tung'},
    {id: 3,name: 'Tu'},
]

app.set('view engine','pug')
app.set('views','./views')

app.get('/', function(req,res){
    res.render('index',{
        name:'AAA'
    })
})

app.get('/users',(req,res) => {
    res.render('users/index',{
        name: users
    })
})

app.get('/users/search',function(req,res){
    var q = req.query.q
    var matchedUsers = users.filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1
    })
    res.render('users/index',{
        name:matchedUsers
    })
})
app.listen(port, () => console.log("Example app listening on port " + port))
