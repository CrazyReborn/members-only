var express = require('express');
var router = express.Router();
const Message = require('../models/message');
const user = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
    Message.find().populate('author').exec(function(err, messages){
    if(err) {
      next(err)
    }
    res.render('index', { title: 'Dashboard', messages: messages, user: false });
  });
});

module.exports = router;
