var express = require("express");
var router = express.Router();
const CommentController = require('../controllers/commentsController.js')


router.get("/comments-list", CommentController.getComments);
router.get("/user-comments/:nick",CommentController.getOnlyUserComments);
router.post("/add-comment", CommentController.addComments);
router.delete("/deleteComment/:id",CommentController.deleteComment);
module.exports = router;
