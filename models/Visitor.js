const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    ip: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    city: String,
    region: String,
    country: String,
    latitude: Number,
    longitude: Number,
    org: String,

    userAgent: String,
    language: String,
    platform: String,
    screen: String,
    timezone: String,

    page: String,
    referrer: String,

    visitedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Visitor", visitorSchema);