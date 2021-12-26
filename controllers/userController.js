const User = require('../models/user');
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

exports.create_user_get = (req, res) => {
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
        if(!errors.isEmpty()) {
            res.render('sign-up-form', {title: 'Sign Up', errors: errors.array()});
        } else {    
            bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
                if (err) {
                  return next(err);
                } else {
                    const user = new User({
                        username: req.body.username,
                        password: hashedPassword,
                        first_name: req.body.first_name,
                        last_name: req.body.last_name,
                        isMember: false,
                        isAdmin: false
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
];

exports.log_in_user_get = (req, res, next) => {
    res.render('log-in-form', {title: 'Log In'});
};

exports.admin_add_get = (req, res) => {
    if (req.user === 'undifined') {
        res.redirect('/');
    } else {
        User.find({isAdmin: false}).exec((err, users) => {
            if (err) {
                next(err);
            } if (users.length == 0) {
                res.render('add-admin', { users: users , message: 'No found users'});
            }
            else {
                res.render('add-admin', { users: users });
            }
        });
    }
}

exports.admin_add_post = (req, res, next) => {
    console.log('start');
    User.findByIdAndUpdate(req.params.id, {isAdmin: true}, (err) => {
        if (err) {
            next(err)
        }
        res.redirect('/');
    })
}