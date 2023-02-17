
const Artist = require('../models/artist.model')
const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')

module.exports.list = (req, res, next) => {
  Artist.find({email: {$ne: req.artist?.email}})
  .then(artists => {
    console.log('artists > ', artists)
    res.render('artists/artists', {artists})
  })
  .catch(next)
}

module.exports.detail = (req, res, next) => {
  Artist.findById(req.params.id)
  .then(artist => {
    res.render('artists/artist', {artist})
  })
  .catch(next)
}

module.exports.login = (req, res, next) => {
  res.render('artists/login', {})
}

module.exports.doLogin = (req, res, next) => {
  Artist.findOne({email: req.body.email})
  .then(artist => {
    return bcrypt
    .compare(req.body.password, artist.password)
    .then(areEquals => {
      if (areEquals) {
        req.session.artistId = artist.id;
        res.redirect('/artists')
      } else {
        res.render('artists/login', {errorPasswordOrEmail: 'Password is incorrect'})
      }
    })
  })
  .catch(error => {
    if (error instanceof mongoose.Error.ValidationError) {
      res.render('artists/login', {errors: error.errors, artist: {email: req.body.email, password: req.body.password}})
    } else {
      res.render('artists/login', {errorPasswordOrEmail: 'Password or Email is incorrect'})
    }
  })
}

module.exports.register = (req, res, next) => {
  res.render('artists/register')
}

module.exports.doRegister = (req, res, next) => {
  console.log(req.body)
  const newArtist = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }
  Artist.findOne({email: newArtist.email})
  .then(artist => {
    if (!artist) {
      Artist.create(newArtist)
      .then((artist) => {
        res.redirect('/login')
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          res.render('artists/register', {errors: error.errors, newArtist})
        } else {
          next(error)
        }
      })
    } else {
      res.render('artists/register', {})
    }
  })
  .catch(next)

}

module.exports.doLogout = (req, res, next) => {
  req.session.destroy()
  res.clearCookie('connect.sid')
  res.redirect('/login')
}

module.exports.edit = (req, res, next) => {
  console.log('currentArtist > ', res.locals.currentArtist)
  res.render('artists/personal-profile', {})
}