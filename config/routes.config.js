const express = require('express')
const router = express.Router()

const common = require('../controllers/common.controller')
router.get('/', common.home)
router.get('/about', common.about)

const artists = require('../controllers/artists.controller')
router.get('/artists', artists.list)



module.exports = router