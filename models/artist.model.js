
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

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
  },
  groups: {
    type: [String] //pendiente de conectar con la coleccion de grupos
  }

})

artistSchema.pre('save', function(next){
  if (this.isModified("password")) {
    bcrypt
    .hash(this.password, 10)
    .then((encryptedPassword) => {
      this.password = encryptedPassword
      next();
    })
    .catch(next);
  } else {
    next();
  }
})

const Artist = mongoose.model('Artist', artistSchema)
module.exports = Artist