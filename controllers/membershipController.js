const {body, validationResult} = require('express-validator');

exports.membership_get = (req, res) => {
    if (req.user === 'undifined') {
        res.redirect('/');
    } else {
        res.render('membership');
    }
}