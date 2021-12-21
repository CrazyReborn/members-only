const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    text: String,
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Message', messageSchema);