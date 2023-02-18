const express = require('express')
const router = express.Router()

const secure = require('../middlewares/secure.mid')

const common = require('../controllers/common.controller')

router.get('/', common.home)
router.get('/about', common.about)

const artists = require('../controllers/artists.controller')

router.get('/artists', artists.list)
router.get('/artists/:id', artists.detail)

router.get('/artists/:id/edit', secure.isAuthenticated, artists.edit)
router.post('/artists/:id', secure.isAuthenticated, artists.doEdit)

router.get('/register', artists.register)
router.post('/register', artists.doRegister)

router.get('/login', artists.login)
router.post('/login', artists.doLogin)

router.post('/logout', artists.doLogout)

module.exports = router