
module.exports.home = (req, res, next) => {
  res.redirect('/artists')
}

module.exports.about = (req, res, next) => {
  res.render('common/about', {})
}