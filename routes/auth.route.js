var express = require('express')
var controller = require('../controller/auth.controller')
var db = require('../db')
// cai nay dung sau
var router = express.Router()

router.get('/login', controller.getLogin)
router.post('/login',controller.postLogin)

module.exports = router;