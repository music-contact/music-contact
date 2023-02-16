
module.exports.isAuthenticated = (req, res, next) => {
  if (req.artist) {
    next()
  } else {
    res.redirect('/login')
  }
}