const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

cloudinary.config({
    cloud_name: 'dq1igjyj6',
    api_key: '989365331395296',
    api_secret: 'rHPRIiNxIDTtmvhDHQ6bBJRgwxQ',
});

exports.uploads = async (file, folder) => {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
        resource_type: 'auto',
        folder: folder,
    };
    try {
        const result = await cloudinary.uploader.upload(file, options);
        return { url: result.url, public_id: result.public_id };
    } catch (err) {
        console.log(err);
    }
};
exports.deleteFolder = async (folder, option) => {
    try {
        await cloudinary.api.delete_resources_by_prefix(`${folder}/`, option);
        await cloudinary.api.delete_folder(folder);
    } catch (err) {
        console.log(err);
    }
};
