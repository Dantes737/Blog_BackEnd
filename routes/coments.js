var express = require("express");
var router = express.Router();
const CommentController = require('../controllers/commentsController.js')


router.get("/comments-list", CommentController.getComments);
router.post("/add-comment", CommentController.addComments)


module.exports = router;
