const mongoose = require('mongoose')
const Schema = mongoose.Schema

//const socialSchema = new Schema({
//  name: {
 //   type: String,
   // enum: ['facebook, instagram, email, twitter']
  //},
 // url: {
   // type: String,
    //required: [true, 'link is required']
  //},
  //artist: {
    //type: mongoose.Schema.Types.ObjectId
  //}
//})

const socialSchema = new Schema({
  socials: { facebook: String, instagram: String, email: String, twitter: String }
})

const Social = mongoose.model('Social', socialSchema)

module.exports = Social