const mongoose = require('mongoose');

// Define Blog Post schema
const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

module.exports = { Post };
