const session = require('express-session')
const MongoStore = require('connect-mongo')
const Artist = require('../models/artist.model')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/music-contact'

module.exports.session = session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.SESSION_SECURE === 'true'
  },
  store: MongoStore.create({
    mongoUrl: MONGODB_URI,
    ttl: 3 * 24 * 60 * 60
  })
})

module.exports.loadSessionArtist = (req, res, next) => {
  const { artistId } = req.session
  if (artistId) {
    Artist.findById(artistId)
    .then(artist => {
      req.artist = artist;
      res.locals.currentArtist = artist;
      next()
    })
    .catch(next)
  } else {
    next()
  }
}