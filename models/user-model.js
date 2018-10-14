const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    provider: String,
    githubId: String,
    googleId: String,
    facebookId: String,
    email: String,
    thumbnail: String
});

const User = mongoose.model('user',userSchema);

module.exports = User;