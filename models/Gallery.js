const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  src: String,
  thumbnail: String,
  title: String,
  location: String,
  date: String,
  description: String
});

const albumSchema = new mongoose.Schema({

  title: String,
  location: String,
  coverImage: String,
  color: String,
  icon: String,
  description: String,
  date: String,
  photographer: String,

  images: [imageSchema]

},{timestamps:true});

module.exports = mongoose.model("Album", albumSchema);