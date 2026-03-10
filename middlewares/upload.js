// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../cloudinary/cloudinary");

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "gallery",
//     allowed_formats: ["jpg", "png", "jpeg", "webp"]
//   }
// });

// const upload = multer({ storage });

// module.exports = upload;













const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../cloudinary/cloudinary");

// Cloudinary storage config
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder = "gallery/images";

    // separate folders
    if (file.fieldname === "coverImage") {
      folder = "gallery/covers";
    }

    return {
      folder: folder,
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      transformation: [{ quality: "auto", fetch_format: "auto" }]
    };
  }
});

// Multer upload
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

module.exports = upload;