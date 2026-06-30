const router = require("express").Router()
const categoryController = require("../controller/category.controller")
const authMiddleware = require("../middleware/adminAuthMidleware")

router.post("/", authMiddleware, categoryController.createCategory)
router.get("/", categoryController.getCategories)
router.patch("/:id", authMiddleware, categoryController.updateCategory)
router.delete("/:id", authMiddleware, categoryController.deleteCategory)

module.exports = router