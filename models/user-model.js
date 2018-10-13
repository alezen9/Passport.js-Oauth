const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    provider: String,
    githubId: String,
    googleId: String,
    thumbnail: String
});

const User = mongoose.model('user',userSchema);

module.exports = User;