const router = require("express").Router();
const cartController = require("../controller/cart.controller");
const auth = require("../middleware/userAuth");

router.post("/", auth, cartController.addToCart);
router.get("/", auth, cartController.getMyCart);
router.delete("/:id", auth, cartController.removeFromCart);

module.exports = router;