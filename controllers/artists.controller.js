
const Artist = require('../models/artist.model')
const ArtistGroup = require('../models/artist-group.model')
const Images = require('../models/image.model')
const mongoose = require('mongoose')

const bcrypt = require('bcryptjs')

module.exports.detail = (req, res, next) => {
  // console.log('detail > ', res.locals.currentArtist)
  Artist.findById(req.params.id)
    .then(artist => {
      // console.log('detail then > ', artist)
      return ArtistGroup.find({ artistId: { $eq: artist.id}})
            .populate('groupId')
            .then(artistGroups => {
              return Images.find({ author: { $eq: artist.id}})
              .then((images) => {
                res.render('artists/artist', { artist, artistGroups, images })   
              })
            })
    })
    .catch(next)
}

module.exports.login = (req, res, next) => {
  if (req.artist) {
    res.redirect('/artists')
  } else {
    res.render('artists/login', {})
  }
}

module.exports.doLogin = (req, res, next) => {
  Artist.findOne({ email: req.body.email })
    .then(artist => {
      return bcrypt
        .compare(req.body.password, artist.password)
        .then(areEquals => {
          if (areEquals) {
            req.session.artistId = artist.id;
            res.redirect('/artists')
          } else {
            res.render('artists/login', { errorPasswordOrEmail: 'Password is incorrect' })
          }
        })
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('artists/login', { errors: error.errors, artist: { email: req.body.email, password: req.body.password } })
      } else {
        res.render('artists/login', { errorPasswordOrEmail: 'Password or Email is incorrect' })
      }
    })
}

module.exports.register = (req, res, next) => {
  if (req.artist) {
    res.redirect('/artists')
  } else {
    res.render('artists/register')
  }
}

module.exports.doRegister = (req, res, next) => {
  // console.log(req.body)
  const newArtist = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }
  Artist.findOne({ email: newArtist.email })
    .then(artist => {
      if (!artist) {
        return Artist.create(newArtist)
          .then((artist) => {
            res.redirect('/login')
          })
      } else {
        res.render('artists/register', {})
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.render('artists/register', { errors: error.errors, newArtist })
      } else {
        next(error)
      }
    })
}

module.exports.doLogout = (req, res, next) => {
  req.session.destroy()
  res.clearCookie('connect.sid')
  res.redirect('/artists')
}

module.exports.edit = (req, res, next) => {
  res.render('artists/personal-profile', {})
}

module.exports.doEdit = (req, res, next) => {
  // console.log('doEdit file > ', req.file)
  if(req.files.length === 1) {
    req.body.image = req.files[0].path
  }
  if (!req.body.findGroup) {
    req.body.findGroup = 'false'
  }
  if (!req.body.forActing) {
    req.body.forActing = 'false'
  }
  Artist.findByIdAndUpdate(req.artist.id, req.body)
  .then(artist => {
    res.redirect(`/artists/${artist.id}`)
  })
  .catch(error => {
    if (error instanceof mongoose.Error.ValidationError) {
      res.render('artists/personal-profile', {errors: error.errors})
    } else {
      next(error)
    }
  })
}