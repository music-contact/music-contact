const express = require('express')
const router = express.Router()

const common = require('../controllers/common.controller')

router.get('/', common.home)
router.get('/about', common.about)

const artists = require('../controllers/artists.controller')

router.get('/artists', artists.list)
router.get('/artists/:id', artists.detail)

router.get('/login', artists.login)
router.post('/login', artists.doLogin)

router.get('/register', artists.register)
router.post('/register', artists.doRegister)

module.exports = router