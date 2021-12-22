var express = require('express');
var router = express.Router();
const Message = require('../models/message');
const user = require('../models/user');
const user_controller = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
    Message.find().populate('author').exec(function(err, messages){
    if(err) {
      next(err)
    }
    res.render('index', { title: 'Dashboard', messages: messages, user: false });
  });
});

router.get('/sign-up', user_controller.create_user_get);
router.post('/sign-up', user_controller.create_user_post);

module.exports = router;
