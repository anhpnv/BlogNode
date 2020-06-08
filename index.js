require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRoute = require('./routes/user.route')
const authRoute = require('./routes/auth.route')
const productRoute = require('./routes/product.route')
const cartRoute = require('./routes/cart.route')
const authMiddleware = require('./middlewares/auth.middlewares')
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL)
const sessionMiddleware = require('./middlewares/sessions.middlewares')

const app = express()
const port = 3000

app.set('view engine','pug')
app.set('views','./views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser(process.env.SESSION_SECRET))
app.use(express.static('public'))
app.use(sessionMiddleware)
app.get('/', function(req,res){
    res.render('index',{
        name:'AAA'
    })
})
app.use('/users',authMiddleware.requireAuth,userRoute);
// app.use('/users',userRoute);
app.use('/auth',authRoute);
app.use('/products', productRoute);
app.use('/cart', cartRoute)
app.listen(port, () => console.log("Example app listening on port " + port + ".If you want to debug, you can use --inspect in npm start"))
