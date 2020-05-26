const express = require('express')
const bodyParser = require('body-parser')
const userRoute = require('./routes/user.route')
const app = express()
const port = 3000

app.set('view engine','pug')
app.set('views','./views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.get('/', function(req,res){
    res.render('index',{
        name:'AAA'
    })
})
app.use('/users',userRoute)

app.listen(port, () => console.log("Example app listening on port " + port))
