const hbs = require('hbs')

hbs.registerPartials(`${__dirname}/../views/partials`)

hbs.registerHelper('checkStatus', (value, options) => {
  if (value === 'true') {
    return options.fn()
  } else {
    return options.inverse()
  }
})

hbs.registerHelper('checkSocial', (link, options) => {
  if (link?.length) {
    return options.fn()
  } else {
    return options.inverse()
  }
})

hbs.registerHelper('checkOwner', (artistId, currentArtistId, options) => {
  // console.log('checkOwner artistId > ', artistId)
  // console.log('checkOwner currentArtistId > ', currentArtistId)
  if (!artistId || !currentArtistId || artistId != currentArtistId){
    return options.inverse()
  } else {
    return options.fn()
  }

  // if(artistId == currentArtistId) {
  //   return options.fn() 
  // } else {
  //   return options.inverse()
  // }
}) 