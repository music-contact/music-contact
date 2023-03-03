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
      // console.log('artists > ', artists) 
      let filteredArtists = artists
      console.log(req.query.search)
      if(req.query.search) {
        filteredArtists = artists.filter(artist => artist.name.startsWith(req.query.search))
      }
      if (req.query.type === 'artist') {
        filteredArtists = filteredArtists.filter(artist => artist.isArtist)
      } else if (req.query.type === 'group') {
        filteredArtists = filteredArtists.filter(artist => artist.isGroup)
      }
      filteredArtists.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        if (req.query.sort === 'desc') {
          return new Date(b.createdAt) - new Date(a.createdAt);
        } else {
          return new Date(a.createdAt) - new Date(b.createdAt);
        }
      });
      res.locals.currentFilter = {
        sort: req.query.sort,
        type: req.query.type,
        search: req.query.search
      }
      // console.log('currentFilter > ', res.locals.currentFilter)
      console.log('filteredArtists > ', filteredArtists)
      res.render('artists/artists', { artists: filteredArtists, query: req.query })
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