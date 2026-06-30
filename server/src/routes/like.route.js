const router = require("express").Router();
const likeController = require("../controller/like.controller");
const auth = require("../middleware/userAuth");

router.post("/", auth, likeController.toggleLike);
router.get("/", auth, likeController.getMyLikes);

module.exports = router;