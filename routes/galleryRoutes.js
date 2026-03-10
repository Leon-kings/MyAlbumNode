

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