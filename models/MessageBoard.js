const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageBoardSchema = new Schema({
    text: String,
    delete_password: String,
    created_on: Date,
    bumped_on: Date,
    reported: Boolean,
    replies: [String]
});


const ModelClass = mongoose.model('messageBoardSchema', messageBoardSchema);

module.exports = ModelClass;

