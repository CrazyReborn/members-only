var express = require('express');
var router = express.Router();
const Message = require('../models/message');
const user = require('../models/user');
const user_controller = require('../controllers/userController');
const membership_controller = require('../controllers/membershipController');
const message_controller = require('../controllers/messageController');
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
router.post('/', message_controller.message_post);

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

router.get('/membership', membership_controller.membership_get);
router.post('/membership', membership_controller.membership_post);


router.post('/message/delete/:id', message_controller.message_delete_post);

router.get('/add-admin', user_controller.admin_add_get);
router.post('/add-admin/:id', user_controller.admin_add_post);

module.exports = router;
