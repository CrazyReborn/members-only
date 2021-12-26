const { DateTime } = require('luxon');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    text: String,
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    date: {type: Date}
});

messageSchema.virtual('date_formatted').get(()=> {
    return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATETIME_MED);
})

module.exports = mongoose.model('Message', messageSchema);