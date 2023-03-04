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
  },
  role: {
    type: String,
    enum: ['admin', null],
    default: null
  }
})

artistGroupSchema.virtual('artists', {
  ref: 'Artist',
  localField: 'artistId',
  foreignField: '_id',
  justOne: false
})

const ArtistGroup = mongoose.model('ArtistGroup', artistGroupSchema)
module.exports = ArtistGroup
