const router = require("express").Router()
const authMiddleware = require("../middleware/adminAuthMidleware")
const { isAdmin } = require("../middleware/isAdmin.Middlevare")
const managerController = require("../controller/manager.controller")

console.log(managerController.createManager);
router.post("/", authMiddleware, isAdmin, managerController.createManager)
router.get("/", authMiddleware, isAdmin, managerController.getManagers)
router.patch("/:id", authMiddleware, isAdmin, managerController.updateManager)
router.get("/:id", authMiddleware, isAdmin, managerController.getManagerById)
router.delete("/:id", authMiddleware, isAdmin, managerController.deleteManager)

module.exports = router