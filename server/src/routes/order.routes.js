const router = require("express").Router();
const orderController = require("../controller/order.controller");
const auth = require("../middleware/userAuth");
const adminAuth = require("../middleware/adminAuthMidleware")

router.post("/checkout", auth, orderController.checkout);
router.get("/", auth, orderController.getMyOrders);
router.get("/all", adminAuth, orderController.getAllOrders)
router.get("/:id", adminAuth, orderController.getOrderById)


module.exports = router;