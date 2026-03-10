// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
// {
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },

//   password: {
//     type: String,
//     required: true
//   }
// },
// { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);








const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["user", "admin", "moderator", "banned"], // status now includes role/permissions
      default: "user"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);