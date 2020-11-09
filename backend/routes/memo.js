const router = require('express').Router();

// get memo
router.get('/', isAuthenticated, (req, res) => {
  res.render('memo', {
    isUserLogged: req.isAuthenticated(),
    username: req.isAuthenticated() ? req.user.username : null,
  });
});

// make sure user authenticated
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) next();
  else {
    req.flash('appMsgError', 'Please login to visit your memo');
    res.redirect('/login');
  }
}

module.exports = router;
