const mongoose = require('mongoose')

const Schema = mongoose.Schema

const artistGroupSchema = new Schema({
  artistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist'
  },
  groupId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  }
})

const ArtistGroup = mongoose.model('ArtistGroup', artistGroupSchema)
module.exports = ArtistGroup
