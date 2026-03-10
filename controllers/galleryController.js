// const Gallery = require("../models/Gallery");
// const cloudinary = require("../cloudinary/cloudinary");


// /* CREATE GALLERY */
// exports.createGallery = async (req,res)=>{
// try{

// const {
// title,
// location,
// color,
// icon,
// description,
// date,
// photographer
// } = req.body;

// const coverImage = req.files.coverImage
// ? req.files.coverImage[0].path
// : null;

// const images = req.files.images
// ? req.files.images.map(file=>({
// src:file.path,
// thumbnail:file.path
// }))
// :[];

// const gallery = await Gallery.create({
// title,
// location,
// coverImage,
// color,
// icon,
// description,
// date,
// photographer,
// images
// });

// res.status(201).json({
// success:true,
// gallery
// });

// }catch(error){

// res.status(500).json({
// success:false,
// message:error.message
// });

// }
// };



// /* GET ALL GALLERIES */

// exports.getGalleries = async (req,res)=>{

// const galleries = await Gallery.find().sort({createdAt:-1});

// res.json({
// success:true,
// galleries
// });

// };



// /* GET SINGLE GALLERY */

// exports.getGallery = async (req,res)=>{

// const gallery = await Gallery.findById(req.params.id);

// if(!gallery){

// return res.status(404).json({
// success:false,
// message:"Gallery not found"
// });

// }

// res.json({
// success:true,
// gallery
// });

// };



// /* UPDATE GALLERY */

// exports.updateGallery = async (req,res)=>{

// try{

// const gallery = await Gallery.findById(req.params.id);

// if(!gallery){

// return res.status(404).json({
// success:false,
// message:"Gallery not found"
// });

// }

// if(req.files.coverImage){
// gallery.coverImage = req.files.coverImage[0].path;
// }

// if(req.files.images){

// const newImages = req.files.images.map(file=>({
// src:file.path,
// thumbnail:file.path
// }));

// gallery.images.push(...newImages);

// }

// Object.assign(gallery,req.body);

// await gallery.save();

// res.json({
// success:true,
// gallery
// });

// }catch(error){

// res.status(500).json({
// success:false,
// message:error.message
// });

// }

// };



// /* DELETE GALLERY */

// exports.deleteGallery = async (req,res)=>{

// try{

// const gallery = await Gallery.findById(req.params.id);

// if(!gallery){

// return res.status(404).json({
// success:false,
// message:"Gallery not found"
// });

// }

// await Gallery.findByIdAndDelete(req.params.id);

// res.json({
// success:true,
// message:"Gallery deleted successfully"
// });

// }catch(error){

// res.status(500).json({
// success:false,
// message:error.message
// });

// }

// // };

// const Album = require("../models/Gallery");
// const cloudinary = require("../cloudinary/cloudinary");

// /* CREATE ALBUM */

// exports.createAlbum = async (req,res)=>{
// try{

// const {
// title,
// location,
// color,
// icon,
// description,
// date,
// photographer
// } = req.body;

// const coverImage = req.files.coverImage
// ? req.files.coverImage[0].path
// : null;

// const images = req.files.images
// ? req.files.images.map(file=>({
// src:file.path,
// thumbnail:file.path
// }))
// :[];

// const album = await Album.create({
// title,
// location,
// color,
// icon,
// description,
// date,
// photographer,
// coverImage,
// images
// });

// res.status(201).json({
// success:true,
// data:album,
// message:"Album created successfully"
// });

// }catch(error){

// res.status(500).json({
// success:false,
// message:error.message
// });

// }
// };



// /* GET ALL ALBUMS */

// exports.getAlbums = async (req,res)=>{

// const albums = await Album.find().sort({createdAt:-1});

// res.json({
// success:true,
// data:albums
// });

// };



// /* GET SINGLE ALBUM */

// exports.getAlbum = async (req,res)=>{

// const album = await Album.findById(req.params.id);

// if(!album){

// return res.status(404).json({
// success:false,
// message:"Album not found"
// });

// }

// res.json({
// success:true,
// data:album
// });

// };



// /* UPDATE ALBUM */

// exports.updateAlbum = async (req,res)=>{
// try{

// const album = await Album.findById(req.params.id);

// if(!album){

// return res.status(404).json({
// success:false,
// message:"Album not found"
// });

// }

// Object.assign(album,req.body);

// if(req.files?.coverImage){
// album.coverImage = req.files.coverImage[0].path;
// }

// if(req.files?.images){

// const newImages = req.files.images.map(file=>({
// src:file.path,
// thumbnail:file.path
// }));

// album.images.push(...newImages);

// }

// await album.save();

// res.json({
// success:true,
// data:album,
// message:"Album updated successfully"
// });

// }catch(error){

// res.status(500).json({
// success:false,
// message:error.message
// });

// }
// };



// /* DELETE ALBUM */

// exports.deleteAlbum = async (req,res)=>{
// try{

// const album = await Album.findById(req.params.id);

// if(!album){

// return res.status(404).json({
// success:false,
// message:"Album not found"
// });

// }

// /* delete images from cloudinary */

// for(const img of album.images){

// const publicId = img.src.split("/").pop().split(".")[0];

// await cloudinary.uploader.destroy(`albums/${publicId}`);

// }

// /* delete cover image */

// if(album.coverImage){

// const publicId = album.coverImage.split("/").pop().split(".")[0];

// await cloudinary.uploader.destroy(`albums/${publicId}`);

// }

// await Album.findByIdAndDelete(req.params.id);

// res.json({
// success:true,
// message:"Album deleted successfully"
// });

// }catch(error){

// res.status(500).json({
// success:false,
// message:error.message
// });

// }
// };



// /* DELETE IMAGE */

// exports.deleteImage = async (req,res)=>{

// try{

// const {albumId,imageId} = req.params;

// const album = await Album.findById(albumId);

// const image = album.images.id(imageId);

// if(!image){

// return res.status(404).json({
// success:false,
// message:"Image not found"
// });

// }

// /* remove from cloudinary */

// const publicId = image.src.split("/").pop().split(".")[0];

// await cloudinary.uploader.destroy(`albums/${publicId}`);

// image.remove();

// await album.save();

// res.json({
// success:true,
// message:"Image deleted successfully"
// });

// }catch(error){

// res.status(500).json({
// success:false,
// message:error.message
// });

// }

// };
















// const Album = require("../models/Gallery");
// const cloudinary = require("../cloudinary/cloudinary");
// const fs = require("fs");

// /* CREATE ALBUM */
// exports.createAlbum = async (req, res) => {
//   try {
//     const { title, location, color, icon, description, date, photographer } = req.body;

//     // Upload cover image
//     let coverImage = null;
//     if (req.files?.coverImage) {
//       const coverFile = req.files.coverImage[0];
//       const result = await cloudinary.uploader.upload(coverFile.path, {
//         folder: "albums"
//       });
//       coverImage = result.secure_url;
//       fs.unlinkSync(coverFile.path); // remove local file after upload
//     }

//     // Upload album images
//     let images = [];
//     if (req.files?.images) {
//       for (const file of req.files.images) {
//         const result = await cloudinary.uploader.upload(file.path, {
//           folder: "albums"
//         });
//         images.push({ src: result.secure_url, thumbnail: result.secure_url });
//         fs.unlinkSync(file.path); // remove local file after upload
//       }
//     }

//     const album = await Album.create({
//       title,
//       location,
//       color,
//       icon,
//       description,
//       date,
//       photographer,
//       coverImage,
//       images
//     });

//     res.status(201).json({
//       success: true,
//       data: album,
//       message: "Album created successfully"
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* GET ALL ALBUMS */
// exports.getAlbums = async (req, res) => {
//   try {
//     const albums = await Album.find().sort({ createdAt: -1 });
//     res.json({ success: true, data: albums });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* GET SINGLE ALBUM */
// exports.getAlbum = async (req, res) => {
//   try {
//     const album = await Album.findById(req.params.id);
//     if (!album) {
//       return res.status(404).json({ success: false, message: "Album not found" });
//     }
//     res.json({ success: true, data: album });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* UPDATE ALBUM */
// exports.updateAlbum = async (req, res) => {
//   try {
//     const album = await Album.findById(req.params.id);
//     if (!album) {
//       return res.status(404).json({ success: false, message: "Album not found" });
//     }

//     // Update basic fields
//     Object.assign(album, req.body);

//     // Replace cover image if provided
//     if (req.files?.coverImage) {
//       if (album.coverImage) {
//         const publicId = album.coverImage.split("/").pop().split(".")[0];
//         await cloudinary.uploader.destroy(`albums/${publicId}`);
//       }
//       const coverFile = req.files.coverImage[0];
//       const result = await cloudinary.uploader.upload(coverFile.path, { folder: "albums" });
//       album.coverImage = result.secure_url;
//       fs.unlinkSync(coverFile.path);
//     }

//     // Add new images
//     if (req.files?.images) {
//       for (const file of req.files.images) {
//         const result = await cloudinary.uploader.upload(file.path, { folder: "albums" });
//         album.images.push({ src: result.secure_url, thumbnail: result.secure_url });
//         fs.unlinkSync(file.path);
//       }
//     }

//     await album.save();

//     res.json({
//       success: true,
//       data: album,
//       message: "Album updated successfully"
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* DELETE ALBUM */
// exports.deleteAlbum = async (req, res) => {
//   try {
//     const album = await Album.findById(req.params.id);
//     if (!album) {
//       return res.status(404).json({ success: false, message: "Album not found" });
//     }

//     // Delete all images from Cloudinary
//     if (album.images.length) {
//       for (const img of album.images) {
//         const publicId = img.src.split("/").pop().split(".")[0];
//         await cloudinary.uploader.destroy(`albums/${publicId}`);
//       }
//     }

//     // Delete cover image from Cloudinary
//     if (album.coverImage) {
//       const publicId = album.coverImage.split("/").pop().split(".")[0];
//       await cloudinary.uploader.destroy(`albums/${publicId}`);
//     }

//     await Album.findByIdAndDelete(req.params.id);

//     res.json({ success: true, message: "Album deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// /* DELETE IMAGE */
// exports.deleteImage = async (req, res) => {
//   try {
//     const { albumId, imageId } = req.params;
//     const album = await Album.findById(albumId);
//     if (!album) return res.status(404).json({ success: false, message: "Album not found" });

//     const image = album.images.id(imageId);
//     if (!image) return res.status(404).json({ success: false, message: "Image not found" });

//     // Delete image from Cloudinary
//     const publicId = image.src.split("/").pop().split(".")[0];
//     await cloudinary.uploader.destroy(`albums/${publicId}`);

//     image.remove();
//     await album.save();

//     res.json({ success: true, message: "Image deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };













const Album = require("../models/Gallery");
const cloudinary = require("../cloudinary/cloudinary");
const fs = require("fs");

/* CREATE ALBUM */
// exports.createAlbum = async (req, res) => {
//   try {
//     const { title, location, color, icon, description, date, photographer } = req.body;

//     let coverImage = null;

//     // Upload cover image
//     if (req.files?.coverImage) {
//       const cover = req.files.coverImage[0];

//       const result = await cloudinary.uploader.upload(cover.path, {
//         folder: "albums/covers"
//       });

//       coverImage = {
//         url: result.secure_url,
//         public_id: result.public_id
//       };

//       fs.unlinkSync(cover.path);
//     }

//     // Upload album images
//     let images = [];

//     if (req.files?.images) {
//       for (const file of req.files.images) {

//         const result = await cloudinary.uploader.upload(file.path, {
//           folder: "albums/images"
//         });

//         images.push({
//           url: result.secure_url,
//           public_id: result.public_id
//         });

//         fs.unlinkSync(file.path);
//       }
//     }

//     const album = await Album.create({
//       title,
//       location,
//       color,
//       icon,
//       description,
//       date,
//       photographer,
//       coverImage,
//       images
//     });

//     res.status(201).json({
//       success: true,
//       message: "Album created successfully",
//       data: album
//     });

//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

exports.createAlbum = async (req, res) => {
  try {

    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const { title, location, color, icon, description, date, photographer } = req.body;

    let coverImage = null;

    if (req.files?.coverImage) {
      const cover = req.files.coverImage[0];

      const result = await cloudinary.uploader.upload(cover.path, {
        folder: "albums/covers"
      });

      coverImage = {
        url: result.secure_url,
        public_id: result.public_id
      };

      if (fs.existsSync(cover.path)) {
        fs.unlinkSync(cover.path);
      }
    }

    let images = [];

    if (req.files?.images) {
      for (const file of req.files.images) {

        const result = await cloudinary.uploader.upload(file.path, {
          folder: "gallery/images"
        });

        images.push({
          url: result.secure_url,
          public_id: result.public_id
        });

        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      }
    }

    const album = await Album.create({
      title,
      location,
      color,
      icon,
      description,
      date,
      photographer,
      coverImage,
      images
    });

    res.status(201).json({
      success: true,
      message: "Album created successfully",
      data: album
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


/* GET ALL ALBUMS */
exports.getAlbums = async (req, res) => {
  try {

    const albums = await Album.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: albums.length,
      data: albums
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* GET SINGLE ALBUM */
exports.getAlbum = async (req, res) => {
  try {

    const album = await Album.findById(req.params.id);

    if (!album) {
      return res.status(404).json({
        success: false,
        message: "Album not found"
      });
    }

    // increase views
    album.statistics.views += 1;
    await album.save();

    res.json({
      success: true,
      data: album
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* UPDATE ALBUM */
exports.updateAlbum = async (req, res) => {
  try {

    const album = await Album.findById(req.params.id);

    if (!album) {
      return res.status(404).json({
        success: false,
        message: "Album not found"
      });
    }

    Object.assign(album, req.body);

    // Replace cover image
    if (req.files?.coverImage) {

      if (album.coverImage?.public_id) {
        await cloudinary.uploader.destroy(album.coverImage.public_id);
      }

      const cover = req.files.coverImage[0];

      const result = await cloudinary.uploader.upload(cover.path, {
        folder: "albums/covers"
      });

      album.coverImage = {
        url: result.secure_url,
        public_id: result.public_id
      };

      fs.unlinkSync(cover.path);
    }

    // Add new images
    if (req.files?.images) {
      for (const file of req.files.images) {

        const result = await cloudinary.uploader.upload(file.path, {
          folder: "albums/images"
        });

        album.images.push({
          url: result.secure_url,
          public_id: result.public_id
        });

        fs.unlinkSync(file.path);
      }
    }

    await album.save();

    res.json({
      success: true,
      message: "Album updated successfully",
      data: album
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* DELETE ALBUM */
exports.deleteAlbum = async (req, res) => {
  try {

    const album = await Album.findById(req.params.id);

    if (!album) {
      return res.status(404).json({
        success: false,
        message: "Album not found"
      });
    }

    // delete cover
    if (album.coverImage?.public_id) {
      await cloudinary.uploader.destroy(album.coverImage.public_id);
    }

    // delete images
    for (const img of album.images) {
      if (img.public_id) {
        await cloudinary.uploader.destroy(img.public_id);
      }
    }

    await Album.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Album deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/* DELETE SINGLE IMAGE */
exports.deleteImage = async (req, res) => {
  try {

    const { albumId, imageId } = req.params;

    const album = await Album.findById(albumId);

    if (!album) {
      return res.status(404).json({
        success: false,
        message: "Album not found"
      });
    }

    const image = album.images.id(imageId);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found"
      });
    }

    if (image.public_id) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    image.remove();

    await album.save();

    res.json({
      success: true,
      message: "Image deleted successfully"
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};