var express = require('express');
var router = express.Router();
const Message = require('../models/message');
const async = require('async');
const user = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  async.parallel({
    messages: function(callback) {
      Message.find().populate('author').exec(callback);
    },
    users: function(callback){
      user.find().exec(callback);
    }
  }, function(err, results){
    if(err) {
      next(err)
    }
    res.render('index', { title: 'Dashboard', messages: results.messages, user: false });
  });
});

module.exports = router;
