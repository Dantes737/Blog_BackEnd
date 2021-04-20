//1.Імпортували модуль
const mongoose = require("mongoose");

//2. Встановлюємо з"єднання
const url = process.env.MONGO_URL || "mongodb://localhost:27017/blogDB"
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//3. Свторюємо схему
const Schema = mongoose.Schema;
// Створення схеми моделі
const profileScheme = new Schema({
  age: String,
  city: String,
  country: String,
  email: String,
  friends: Array,
  name: String,
  nick: String,
  posts_id: Array,
  avatarIMG: String,
  followed: Boolean,
  status:String
});

module.exports = mongoose.model("Profile", profileScheme);