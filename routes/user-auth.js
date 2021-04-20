var express = require("express");
var router = express.Router();
const UserController=require("../controllers/userController.js")

router.post("/signup",UserController.signUpUser);
router.post("/login",UserController.loginUser);

module.exports = router;
