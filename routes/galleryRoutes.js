// const express = require("express");
// const router = express.Router();

// const upload = require("../middlewares/upload");

// const {
// createGallery,
// getGalleries,
// getGallery,
// updateGallery,
// deleteGallery
// } = require("../controllers/galleryController");

// router.post(
// "/create",
// upload.fields([
// { name:"coverImage", maxCount:1 },
// { name:"images", maxCount:20 }
// ]),
// createGallery
// );

// router.get("/",getGalleries);

// router.get("/:id",getGallery);

// router.put(
// "/:id",
// upload.fields([
// { name:"coverImage", maxCount:1 },
// { name:"images", maxCount:20 }
// ]),
// updateGallery
// );

// router.delete("/:id",deleteGallery);

// module.exports = router;
















// const express = require("express");
// const router = express.Router();

// const upload = require("../middlewares/upload");

// const {
// createAlbum,
// getAlbums,
// getAlbum,
// updateAlbum,
// deleteAlbum,
// deleteImage
// } = require("../controllers/galleryController");

// router.post(
// "/",
// upload.fields([
// {name:"coverImage",maxCount:1},
// {name:"images",maxCount:50}
// ]),
// createAlbum
// );

// router.get("/",getAlbums);

// router.get("/:id",getAlbum);

// router.put(
// "/:id",
// upload.fields([
// {name:"coverImage",maxCount:1},
// {name:"images",maxCount:50}
// ]),
// updateAlbum
// );

// router.delete("/:id",deleteAlbum);

// router.delete("/:albumId/images/:imageId",deleteImage);

// module.exports = router;











const express = require("express");
const router = express.Router();

// Multer upload middleware
const upload = require("../middlewares/upload");

// Gallery controller
const {
  createAlbum,
  getAlbums,
  getAlbum,
  updateAlbum,
  deleteAlbum,
  deleteImage
} = require("../controllers/galleryController");

// Create album (cover + multiple images)
router.post(
  "/",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "images", maxCount: 50 }
  ]),
  createAlbum
);

// Get all albums
router.get("/", getAlbums);

// Get single album
router.get("/:id", getAlbum);

// Update album (cover + additional images)
router.put(
  "/:id",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "images", maxCount: 50 }
  ]),
  updateAlbum
);

// Delete album
router.delete("/:id", deleteAlbum);

// Delete single image from album
router.delete("/:albumId/images/:imageId", deleteImage);

module.exports = router;