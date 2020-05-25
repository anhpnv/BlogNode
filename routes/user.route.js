var express = require('express')

var controller = require('../controller/user.controller')
var router = express.Router()

router.get('/', controller.index)

router.get('/search', controller.search)
router.get('/create', controller.getUser)
router.post('/create', controller.postUser)

router.get('/:id', controller.id)

module.exports = router