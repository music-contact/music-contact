const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schemaImage = new Schema({
  url: {
    type: String,
    required: [true, 'image is required']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId
  }
})

const Image = mongoose.model('Image', schemaImage)

module.exports = Image