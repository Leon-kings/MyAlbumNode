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

// };

const Album = require("../models/Gallery");
const cloudinary = require("../cloudinary/cloudinary");

/* CREATE ALBUM */

exports.createAlbum = async (req,res)=>{
try{

const {
title,
location,
color,
icon,
description,
date,
photographer
} = req.body;

const coverImage = req.files.coverImage
? req.files.coverImage[0].path
: null;

const images = req.files.images
? req.files.images.map(file=>({
src:file.path,
thumbnail:file.path
}))
:[];

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
success:true,
data:album,
message:"Album created successfully"
});

}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}
};



/* GET ALL ALBUMS */

exports.getAlbums = async (req,res)=>{

const albums = await Album.find().sort({createdAt:-1});

res.json({
success:true,
data:albums
});

};



/* GET SINGLE ALBUM */

exports.getAlbum = async (req,res)=>{

const album = await Album.findById(req.params.id);

if(!album){

return res.status(404).json({
success:false,
message:"Album not found"
});

}

res.json({
success:true,
data:album
});

};



/* UPDATE ALBUM */

exports.updateAlbum = async (req,res)=>{
try{

const album = await Album.findById(req.params.id);

if(!album){

return res.status(404).json({
success:false,
message:"Album not found"
});

}

Object.assign(album,req.body);

if(req.files?.coverImage){
album.coverImage = req.files.coverImage[0].path;
}

if(req.files?.images){

const newImages = req.files.images.map(file=>({
src:file.path,
thumbnail:file.path
}));

album.images.push(...newImages);

}

await album.save();

res.json({
success:true,
data:album,
message:"Album updated successfully"
});

}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}
};



/* DELETE ALBUM */

exports.deleteAlbum = async (req,res)=>{
try{

const album = await Album.findById(req.params.id);

if(!album){

return res.status(404).json({
success:false,
message:"Album not found"
});

}

/* delete images from cloudinary */

for(const img of album.images){

const publicId = img.src.split("/").pop().split(".")[0];

await cloudinary.uploader.destroy(`albums/${publicId}`);

}

/* delete cover image */

if(album.coverImage){

const publicId = album.coverImage.split("/").pop().split(".")[0];

await cloudinary.uploader.destroy(`albums/${publicId}`);

}

await Album.findByIdAndDelete(req.params.id);

res.json({
success:true,
message:"Album deleted successfully"
});

}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}
};



/* DELETE IMAGE */

exports.deleteImage = async (req,res)=>{

try{

const {albumId,imageId} = req.params;

const album = await Album.findById(albumId);

const image = album.images.id(imageId);

if(!image){

return res.status(404).json({
success:false,
message:"Image not found"
});

}

/* remove from cloudinary */

const publicId = image.src.split("/").pop().split(".")[0];

await cloudinary.uploader.destroy(`albums/${publicId}`);

image.remove();

await album.save();

res.json({
success:true,
message:"Image deleted successfully"
});

}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}

};