const Message = require('../models/message');
const async = require('async');
const { body, validationResult } = require('express-validator');

exports.message_post = [
    body('message', 'Message should not be empty').trim().isLength({min: 1}).escape(),

    (req, res, next) => {
        console.log('before validtion, user, and message', req.user._id, req.body.message);
        const errors = validationResult(req);
        
        const message = new Message({
            text: req.body.message,
            author: req.user._id
        })
        if (!errors.isEmpty()) {
            console.log('errors during validation')
            res.render('index', {title: 'Dashboard', errors: errors.array()})
        } else {
            console.log('no errors during validation');
            message.save((err) => {
                console.log('sae started');
                if (err) {
                    return next(err)
                }
                res.redirect('/');
            })
        }
    }
];