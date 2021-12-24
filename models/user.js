const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    password: String,
    isMember: Boolean,
    first_name: String,
    last_name: String
});

userSchema.virtual('full_name').get(function() {
    return this.first_name + ' ' + this.last_name;
});

userSchema.virtual('status').get(function() {
    if (this.isMember) {
        return 'Member'
    } else {
        return 'Not a member'
    }
});

module.exports = mongoose.model('User', userSchema);