const mongoose=require("mongoose");

const Schema=mongoose.Schema;

module.exports= new Schema({
text:String,
data:String,
img:String,
userNick:String,
category:String,
coments:Array
});

