
const Artist = require('../models/artist.model')

module.exports.list = (req, res, next) => {
  res.render('artists/artists', {})
}

module.exports.detail = (req, res, next) => {
  res.send('')
}

module.exports.login = (req, res, next) => {}

module.exports.doLogin = (req, res, next) => {}

module.exports.register = (req, res, next) => {}

module.exports.doRegister = (req, res, next) => {}