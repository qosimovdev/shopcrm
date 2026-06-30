const router = require("express").Router()
const productController = require("../controller/product.controller")
const authMiddleware = require("../middleware/adminAuthMidleware");
const upload = require("../middleware/upload");

router.post("/", authMiddleware, upload.array("images", 10), productController.createProduct);
router.get("/", productController.getProducts)
router.patch("/:id", authMiddleware, productController.updateProduct)
router.get("/:id", productController.getProductById)
router.delete("/:id", authMiddleware, productController.deleteProduct)

module.exports = router