const hbs = require('hbs')

hbs.registerPartials(`${__dirname}/../views/partials`)

hbs.registerHelper('checkBox', (value, options) => {
  if (value === 'true') {
    return options.fn()
  } else {
    return options.inverse()
  }
})

hbs.registerHelper('checkSocial', (value, options) => {
  if (value.length) {
    return options.fn()
  } else {
    return options.inverse()
  }
})

hbs.registerHelper('checkOwner', (artistId, currentArtistId, options) => {
  if(artistId == currentArtistId) {
    return options.fn() 
  } else {
    return options.inverse()
  }
}) 