require('dotenv').config();
const mongoose = require("mongoose");

const url = process.env.MONGO_URL;
mongoose.connect(url, { useNewUrlParser: true,useUnifiedTopology: true});

const Schema=mongoose.Schema;

const PostScheme = new Schema({
text:String,
data:String,
img:String,
userNick:String,
title:String,
coments:Array
});

module.exports = mongoose.model("Posts", PostScheme);

