// const mongoose = require("mongoose");

// const imageSchema = new mongoose.Schema({
//   src: String,
//   thumbnail: String,
//   title: String,
//   location: String,
//   date: String,
//   description: String
// });

// const albumSchema = new mongoose.Schema({

//   title: String,
//   location: String,
//   coverImage: String,
//   color: String,
//   icon: String,
//   description: String,
//   date: String,
//   photographer: String,

//   images: [imageSchema]

// },{timestamps:true});

// module.exports = mongoose.model("Album", albumSchema);





// const mongoose = require("mongoose");

// // Schema for each image
// const imageSchema = new mongoose.Schema({
//   filename: String,         // original filename
//   data: Buffer,             // image data
//   contentType: String,      // mime type
//   title: String,
//   location: String,
//   date: String,
//   description: String
// });

// // Schema for album statistics
// const statisticsSchema = new mongoose.Schema({
//   views: { type: Number, default: 0 },
//   likes: { type: Number, default: 0 },
//   downloads: { type: Number, default: 0 }
// });

// // Album schema
// const albumSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   location: String,
//   coverImage: {
//     filename: String,
//     data: Buffer,
//     contentType: String
//   },
//   color: String,
//   icon: String,
//   description: String,
//   date: String,
//   photographer: String,
//   images: [imageSchema],
//   statistics: statisticsSchema
// }, { timestamps: true });

// module.exports = mongoose.model("Album", albumSchema);












const mongoose = require("mongoose");

// Image schema
const imageSchema = new mongoose.Schema({
  url: String,
  public_id: String,
  title: String,
  location: String,
  date: String,
  description: String
});

// Statistics schema
const statisticsSchema = new mongoose.Schema({
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  downloads: { type: Number, default: 0 }
});

// Album schema
const albumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: String,

  coverImage: {
    url: String,
    public_id: String
  },

  color: String,
  icon: String,
  description: String,
  date: String,
  photographer: String,

  images: [imageSchema],

  statistics: statisticsSchema
}, { timestamps: true });

module.exports = mongoose.model("Album", albumSchema);