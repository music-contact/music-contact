const Group = require('../models/group.model')
const ArtistGroup = require('../models/artist-group.model')
const mongoose = require('mongoose')

module.exports.list = (req, res, next) => {}

module.exports.detail = (req, res, next) => {
  console.log('req.artist > ', req.artist)
  console.log('req.params > ', req.params)

  ArtistGroup.findOne({artistId: req.artist?.id, groupId: req.params.id})
  .then(artistGroup => {
    console.log('artistGroup > ', artistGroup)
    res.render('groups/group', {artistGroup})
  })
  .catch(next)

  console.log('detail group')
}

module.exports.new = (req, res, next) => {
  delete res.locals.currentGroup
  res.render('groups/group-profile', {})
}

module.exports.doNew = (req, res, next) => {
  const newGroup = {
    name: req.body.name,
    email: req.body.email
  }
  console.log('newGroup > ', newGroup)
  Group.findOne({email: newGroup.email})
  .then(group => {
    if (!group) {
      return Group.create(newGroup)
      .then(group => {
        return ArtistGroup.create({artistId: req.artist.id, groupId: group.id})
        .then(artistGroup => {
          res.redirect(`/groups/${group.id}`)
        })
      })
    }
  })
  .catch(next)
}

module.exports.edit = (req, res, next) => {
  // res.locals.currentGroup
  res.render('groups/group-profile', {})
}

module.exports.doEdit = (req, res, next) => {}