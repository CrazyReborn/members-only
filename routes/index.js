var express = require('express');
var router = express.Router();
const Message = require('../models/message');
const user = require('../models/user');
const user_controller = require('../controllers/userController');
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
    Message.find().populate('author').exec(function(err, messages){
    if(err) {
      next(err)
    };
    res.render('index', { title: 'Dashboard', messages: messages, user: req.user });
  });
});

router.get('/sign-up', user_controller.create_user_get);
router.post('/sign-up', user_controller.create_user_post);

router.get('/log-in', user_controller.log_in_user_get);

router.post('/log-in', 
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/log-in'
  })
);

router.get('/log-out', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
