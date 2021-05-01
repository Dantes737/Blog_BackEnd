var express = require("express");
var router = express.Router();
const PostController = require('../controllers/postController.js')


router.get("/posts-list", PostController.getPosts);
router.get("/user-posts/:nick",PostController.getOnlyUserPosts);
router.post("/add-post", PostController.addPost);
router.delete("/deletePost/:id",PostController.deletePost);

module.exports = router;
