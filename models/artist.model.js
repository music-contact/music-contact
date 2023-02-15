
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const artistSchema = new Schema({
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
  password: {
    type: String,
    required: [true, 'password is required' ],
    minLength: [8, 'min length is 8']
  },
  role: {
    type: String,
    enum: ['artist', 'group'],
    required: [true, 'role is required']
  },
  description: {
    type: String
  },
  findGroup: {
    type: String,
    enum: ['available', 'not available']
  },
  forActing: {
    type: String,
    enum: ['available', 'not available']
  },
  image: {
    type: String
  },
  socialMedia: {
    type: [String]
  } 

})

// mongoose.pre('save', function(){})

const Artist = mongoose.model('Model', artistSchema)
module.exports = Artist