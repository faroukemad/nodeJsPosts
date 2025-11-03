const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const postsController = require("../controllers/postsController");

router.post("/", auth, postsController.createPost);
router.get("/", postsController.getPosts);
router.put("/:id", auth, postsController.updatePost);
router.delete("/:id", auth, postsController.deletePost);

module.exports = router;