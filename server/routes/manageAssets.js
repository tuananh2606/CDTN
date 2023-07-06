const router = require('express').Router();
const middlewareAuth = require('../middlewares/auth');
const { deleteImages, deleteVideos } = require('../utils/uploadFiles');

router.post('/delete-images', deleteImages);
router.post('/delete-videos', deleteVideos);

module.exports = router;
