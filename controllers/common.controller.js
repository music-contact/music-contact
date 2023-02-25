const Artist = require('../models/artist.model')
const Groups = require('../models/group.model')
const ArtistGroup = require('../models/artist-group.model')

module.exports.list = (req, res, next) => {
  Promise.all([
    Artist.find({ email: { $ne: req.artist?.email } })
      .populate({
        path: 'groups', // nos devuelve solo el id de cada grupo
        populate: {
          path: 'groupId'
        }
      }),
    ArtistGroup.find({ artistId: { $ne: req.artist?.id } })
    .populate('groupId')
    .populate({
      path: 'artists', // nos devuelve solo el id de cada grupo
      populate: {
        path: '_id'
      }
    })
  ])
  .then(([uniqueArtists, artistGroups]) => {
    console.log('artistGroups > ', artistGroups)
    const uniqueGroups = artistGroups.reduce((acc, current) => {
      if (!acc.find((item) => item.groupId === current.groupId)) {
        acc.push(current.groupId);
      }
      return acc;
    }, [])

    uniqueArtists.forEach(artist => artist.isArtist = true)
    uniqueGroups.forEach(group => group.isGroup = true)
    
    const artists = [...uniqueArtists, ...uniqueGroups]
    
    // console.log('common list artists > ', artists)

    res.render('artists/artists', { artists })
  })
  .catch(next)


  // .then(artists => {
    //   console.log('artists > ', artists)
    //   res.render('artists/artists', { artists })
    // })
    // .catch(next)
  
}


module.exports.home = (req, res, next) => {
  res.redirect('/artists')
}

module.exports.about = (req, res, next) => {
  res.render('common/about', {})
}