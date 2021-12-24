const {body, validationResult} = require('express-validator');
const async = require('async');
const User = require('../models/user');

exports.membership_get = (req, res) => {
    console.log(req.user);
    if (req.user === 'undifined') {
        res.redirect('/');
    } else {
        res.render('membership');
    }
}

exports.membership_post = (req, res) => [
    body('secret').trim().isLength({min: 1}).escape().custom((value, {req}) => {
        if (value !== req.body.secter) {
            throw new Error('Wrong password');
        }
        return true;
    }),
    User.findById(req.user._id).exec( (err, user) => {
        console.log(user)
        if (err) {
            return next(err);
        } else {
            User.findByIdAndUpdate(user._id, { isMember: true }, function statusGranted(err, status){
            if (err) {
                return next(err)
            }
            res.redirect('/');
            });
        }
    })
];