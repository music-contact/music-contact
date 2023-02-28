const Artist = require('../models/artist.model')
const Group = require('../models/group.model')
const ArtistGroup = require('../models/artist-group.model')

module.exports.list = (req, res, next) => {
  console.log('list artist?.id> ', req.artist?.id)
  Promise.all([
    Artist.find({ email: { $ne: req.artist?.email } })
      .populate({
        path: 'groups', // nos devuelve solo el id de cada grupo
        populate: {
          path: 'groupId'
        }
      }),
    ArtistGroup.find({ artistId: { $eq: req.artist?.id } })
    .distinct('groupId')
  ])
  .then(([uniqueArtists, userGroups]) => {
    // console.log('uniqueArtists > ', uniqueArtists)
    // console.log('userGroups > ', userGroups)    
    return Group.find({'_id': {$nin: userGroups}})
    .populate({
      path: 'artists',
      populate: {
        path: 'artistId'
      }
    })
    .then((uniqueGroups => {
      // console.log('then uniqueGroups > ', uniqueGroups[0].artists)
      uniqueArtists.forEach(artist => artist.isArtist = true)
      uniqueGroups.forEach(group => group.isGroup = true)    
      const artists = [...uniqueArtists, ...uniqueGroups]    
      res.render('artists/artists', { artists })
      // res.send('done!')
    }))
  })
  .catch(next)
  
}


module.exports.home = (req, res, next) => {
  res.redirect('/artists')
}

module.exports.about = (req, res, next) => {
  res.render('common/about', {})
}