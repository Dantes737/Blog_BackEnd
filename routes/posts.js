var express = require("express");
var router = express.Router();
const PostController = require('../controllers/postController.js');
const checkAuth = require('../auth-midlleware/check-auth.js');

router.get("/posts-list", checkAuth, PostController.getPosts);
router.get("/user-posts/:nick", checkAuth, PostController.getOnlyUserPosts);
router.post("/add-post", checkAuth, PostController.addPost);
router.delete("/deletePost/:id", checkAuth, PostController.deletePost);

module.exports = router;
