const express = require('express')
const router = express.Router()

const storage = require('../config/storage.config')

const secure = require('../middlewares/secure.mid')

const common = require('../controllers/common.controller')

router.get('/', common.home)
router.get('/about', common.about)

const artists = require('../controllers/artists.controller')

router.get('/artists', artists.list)
router.get('/artists/:id', artists.detail)

router.get('/artists/:id/edit', secure.isAuthenticated, artists.edit)
router.post('/artists/:id', secure.isAuthenticated, storage.single('image'), artists.doEdit)

router.get('/register', artists.register)
router.post('/register', artists.doRegister)

router.get('/login', artists.login)
router.post('/login', artists.doLogin)

router.post('/logout', artists.doLogout)

const groups = require('../controllers/groups.controller')

router.get('/groups/new', secure.isAuthenticated, groups.new)
router.post('/groups/new', secure.isAuthenticated, storage.single('image'), groups.doNew)

router.get('/groups/:id', groups.detail)

router.get('/groups/:id/edit', secure.isAuthenticated, groups.edit)
router.post('/groups/:id', secure.isAuthenticated, storage.single('image'), groups.doEdit)

module.exports = router