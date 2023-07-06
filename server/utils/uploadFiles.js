const cloudinary = require('../cloudinary');
const cloudinaryApi = require('cloudinary').v2;
const fs = require('fs');

exports.uploadFiles = async (req, res, pathImage) => {
    const uploader = async (path, folder) => await cloudinary.uploads(path, folder);
    const urls = { images: [], videos: { desktop_tablet: [], mobile: [] } };
    const imageFiles = req.files.images !== undefined && req.files.images;
    const videosFiles = req.files.videos !== undefined && req.files.videos;

    const { name, category } = req.body;
    if (videosFiles) {
        for (const file of videosFiles) {
            const { path, filename } = file;
            const newPath = await uploader(path, `Videos/${req.body.name}`);
            if (filename.includes('mobile')) {
                urls.videos.mobile.push(newPath);
            } else {
                urls.videos.desktop_tablet.push(newPath);
            }
            fs.unlinkSync(path);
        }
    }
    if (imageFiles) {
        for (const file of imageFiles) {
            const { path } = file;
            const newPath = await uploader(path, `Images/${pathImage ? pathImage : name}`);
            urls.images.push(newPath);
            fs.unlinkSync(path);
        }
    }
    return urls;
};
exports.deleteImages = async (req, res) => {
    try {
        await cloudinaryApi.api.delete_resources([req.body.publicId], { type: 'upload', resource_type: 'image' });
        return res.status(200).send('Delete Successfully');
    } catch (error) {
        return res.status(500).send('Delete Error');
    }
};
exports.deleteVideos = async (req, res) => {
    try {
        await cloudinaryApi.api.delete_resources([req.body.publicId], { type: 'upload', resource_type: 'video' });
        return res.status(200).send('Delete Successfully');
    } catch (error) {
        return res.status(500).send('Delete Error');
    }
};
