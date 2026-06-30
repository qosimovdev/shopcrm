const router = require("express").Router()
const userController = require("../controller/userAuth.controller")

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/me", userController.getMe)

module.exports = router