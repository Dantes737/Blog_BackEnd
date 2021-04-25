require('dotenv').config();
const mongoose = require("mongoose");

const url = process.env.MONGO_URL;
mongoose.connect(url, { useNewUrlParser: true,useUnifiedTopology: true});

//3. Свторюємо схему
const Schema = mongoose.Schema;
// Створення схеми моделі
const profileScheme = new Schema({
  age: String,
  city: String,
  country: String,
  email: String,
  friends: Object,
  name: String,
  nick: String,
  posts_id: Array,
  avatarIMG: String,
  followed: Boolean,
  status:String
});

module.exports = mongoose.model("Profile", profileScheme);