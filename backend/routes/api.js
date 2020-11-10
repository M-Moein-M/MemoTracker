const router = require('express').Router();
const { memoHandler } = require('../memoHandler.js');

router.post('/memo/new', isAuthenticated, (req, res) => {
  const text = req.body['memo-body'];
  const tags = req.body['memo-tags'];
  console.log(text);
  console.log(tags);

  memoHandler.insertNewMemo(text, tags, req.user);

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
