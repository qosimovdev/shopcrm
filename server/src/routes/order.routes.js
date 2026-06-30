const router = require("express").Router();
const orderController = require("../controller/order.controller");
const auth = require("../middleware/userAuth");

router.post("/checkout", auth, orderController.checkout);
router.get("/", auth, orderController.getMyOrders);

module.exports = router;