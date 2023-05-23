const router = require("express").Router();
const { createProduct, getAllProducts } = require('../controllers/productController');

router.post("/", createProduct)
router.get("/", getAllProducts)
module.exports = router;