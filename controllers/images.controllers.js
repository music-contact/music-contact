const Artist = require('../models/artist.model')
const Group = require('../models/group.model')
const Image = require('../models/image.model')

module.exports.new = (req, res, next) => {
  console.log('controller new > ', req.params)
  Artist.findById(req.params.id)
    .then((artist) => {
      if (artist) {
        res.render('images/image-profile', { url: `/images/artists/${req.params.id}/newImage` })
      } else {
        return Group.findById(req.params.id)
          .then((group) => {
            res.render('images/image-profile', { url: `/images/groups/${req.params.id}/newImage` })
          })
      }
    })
    .catch(next)

}

module.exports.doNew = (author) => {
  return (req, res, next) => {
    // console.log('images doNew req.body > ', req.body)
    console.log('images doNew req.files >', req.files)
    if (req.files.length) {
      let images = req.files.map(file => ({ url: file.path, author: req.params.id }))
      Image.insertMany(images)
        .then(() => {
          if (author === 'artist') {
            res.redirect(`/artists/${req.params.id}`)
          } else if (author === 'group') {
            res.redirect(`/groups/${req.params.id}`)
          }
        })
        .catch(next)
    }
  }
}

module.exports.delete = (author) => {
  return (req, res, next) => {
    Image.findById(req.params.id)
      .then(image => {
        const authorId = image.author
        return image.delete()
          .then(() => {
            if (author === 'artist') {
              res.redirect(`/artists/${authorId}`)
            } else if (author === 'group') {
              res.redirect(`/groups/${authorId}`)
            }
          })
      })
      .catch(next)
  }
}

// module.exports.delete = (req, res, next) => {
//   Tweet.findById(req.params.id)
//     .then(tweet => {
//       if (!tweet) {
//         res.redirect("/tweets")
//       } else if (tweet.user == req.user.id) {
//         console.log('deleting tweet');
//         tweet.delete()
//           .then(() => res.redirect("/tweets"))
//           .catch(next)
//       } else {
//         res.redirect("/tweets")
//       }
//     })
//     .catch(next);
// };