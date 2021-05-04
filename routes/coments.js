var express = require("express");
var router = express.Router();
const CommentController = require('../controllers/commentsController.js')
const checkAuth = require('../auth-midlleware/check-auth.js');

router.get("/comments-list", checkAuth, CommentController.getComments);
router.get("/user-comments/:nick", checkAuth, CommentController.getOnlyUserComments);
router.post("/add-comment", checkAuth, CommentController.addComments);
router.delete("/deleteComment/:id", checkAuth, CommentController.deleteComment);
module.exports = router;
