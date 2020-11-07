const router = require('express').Router();

router.post('/memo/new', isAuthenticated, (req, res) => {
  console.log(req.body['memo-body']);
  res.redirect('/memo');
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
