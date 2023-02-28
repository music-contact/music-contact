const mongoose = require('mongoose')

const Schema = mongoose.Schema

const groupSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    minLength: [3, 'min length is 3']
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    trim: true,
    unique: true
  },
  description: {
    type: String
  },
  forActing: {
    type: String,
    default: "false"
  },
  image: {
    type: String
  },
  socialMedia: {
    facebook: String,
    twitter: String,
    instagram: String,
    email: String,
    spotify: String
  }
},
{ timestamps: true }
)

groupSchema.virtual('artists', {
  ref: 'ArtistGroup',
  localField: '_id',
  foreignField: 'groupId',
  // justOne: false
})

const Group = mongoose.model('Group', groupSchema)
module.exports = Group
