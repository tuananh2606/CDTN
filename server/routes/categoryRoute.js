const router = require("express").Router();
const { createCategory, getAllCategories } = require('../controllers/categoryController');

router.post("/", createCategory)
router.get("/", getAllCategories)
module.exports = router;