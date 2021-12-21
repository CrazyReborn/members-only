var express = require('express');
var router = express.Router();
const Message = require('../models/message');

/* GET home page. */
router.get('/', function(req, res, next) {
  Message.find().exec(function(err, messages){
    if(err) {
      next(err)
    }
    res.render('index', { title: 'Dashboard', messages: messages });
  })
  
});

module.exports = router;
