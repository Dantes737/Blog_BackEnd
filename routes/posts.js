var express = require("express");
var router = express.Router();
const PostController = require('../controllers/postController.js')


router.get("/posts-list", PostController.getPosts);
router.post("/add-post", PostController.addPost)


module.exports = router;
