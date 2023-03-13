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
  if (!artistId || !currentArtistId || artistId != currentArtistId) {
    return options.inverse()
  } else {
    return options.fn()
  }
})

hbs.registerHelper("navActive", (currentPath, desiredPath) => {
  return currentPath === desiredPath ? "active" : "";
});

hbs.registerHelper('checkImage', (image, options) => {
  if (image?.length) {
    return options.fn()
  } else {
    return options.inverse()
  }
})

hbs.registerHelper("fixNavbar", (currentPath, options) => {
  return !currentPath.split('/')
    .pop()
    .includes('artists') ? "sticky-top" : ""
})

hbs.registerHelper('isMember', (members, candidate) => {
  // console.log('isMember > ', members.some((member) => member.artistId.id === candidate.id))
  return members.some((member) => member.artistId.id === candidate.id) ? "checked" : ""
})