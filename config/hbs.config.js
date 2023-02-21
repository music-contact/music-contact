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
  if (!currentArtistId || !artistId){
    return options.inverse()
  }
  if(artistId.toString() === currentArtistId) {
    return options.fn() 
  } else {
    return options.inverse()
  }
}) 