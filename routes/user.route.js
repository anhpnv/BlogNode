var express = require('express')
var multer = require('multer')
var upload = multer({dest: './public/uploads/'})
var controller = require('../controller/user.controller')
var validate = require('../validate/user.validate')
var router = express.Router()

router.get('/', controller.index)
router.get('/search', controller.search)
router.get('/create', controller.getUser)
router.post('/create', upload.single('avatar'),validate.postCreate, controller.postUser)
router.get('/:id', controller.id)
module.exports = router