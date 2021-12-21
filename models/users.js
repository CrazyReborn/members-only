const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    first_name: String,
    last_name: String
});

userSchema.virtual('full_name').get(function() {
    return this.first_name + ' ' + this.last_name;
});

module.exports = mongoose.model('User', userSchema);