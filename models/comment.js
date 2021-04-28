require('dotenv').config();
const mongoose = require("mongoose");

const url = process.env.MONGO_URL;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const CommentScheme = new Schema({
    text: String,
    userNick: String,
    post_ID: String,
    data: String
});

module.exports = mongoose.model("Coments", CommentScheme);

