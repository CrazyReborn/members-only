const User = require('../models/user');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

exports.create_user_get = function(req, res) {
    res.render('sign-up-form', {title: 'Sign Up'});
};

exports.create_user_post = [
    
    body("first_name", "Username must not be empty").trim().isLength({min:1}).escape(),
    body("last_name", "Username must not be empty").trim().isLength({min:1}).escape(),
    body("username", "Username must not be empty").trim().isLength({min:1}).escape(),
    body("password", "Password must not be empty").trim().isLength({min:1}).escape(),
    body('confirm-password').trim().isLength({min:1}).trim().isLength({min: 1}).escape().custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.render('sign-up-form', {title: 'Sign Up', errors: errors.array()});
        } else {    
            bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                if (err) {
                    next(err);
                } else {
                    const user = new User({
                        username: req.body.username,
                        password: hashedPassword,
                        first_name: req.body.first_name,
                        last_name: req.body.second_name
                    }).save(function (err) {
                        if (err) {
                            return next(err);
                        }
                        res.redirect('/')
                    });
                }
            });
        }
    }
]