const router = require("express").Router()
const adminController = require("../controller/adminAuth.controller")
const authMiddleware = require("../middleware/adminAuthMidleware")

router.post("/login", adminController.login)
router.get("/me", authMiddleware, adminController.getMe)

module.exports = router