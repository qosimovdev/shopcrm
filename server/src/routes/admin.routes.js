const router = require("express").Router()
const adminController = require("../controller/adminAuth.controller")
const authMiddleware = require("../middleware/adminAuthMidleware")

router.post("/login", adminController.login)

module.exports = router